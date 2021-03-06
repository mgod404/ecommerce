from decimal import *
from datetime import date, timedelta
import json

from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils import timezone
from django.db.models import Count
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from requests import delete

from rest_framework import generics, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as drfilters
from django_filters import filters as new_filters

from paypalrestsdk import notifications
from .sendmail import send_payment_confirmation

from .models import *
from .serializers import *

class MultiValueCharFilter(new_filters.BaseCSVFilter, new_filters.CharFilter):
    def filter(self, qs, value):
        # value is either a list or an 'empty' value
        values = value or []

        for value in values:
            qs = super(MultiValueCharFilter, self).filter(qs, value)

        return qs


class ProductSearchFilter(drfilters.FilterSet):
    price = drfilters.RangeFilter()
    brand = MultiValueCharFilter()
    class Meta:
        model = Product
        fields = ['price','brand','category']


class HomeView(generics.ListAPIView):
    queryset_discounts = Discount.objects \
        .filter(begins__lte=date.today(), ends__gt=date.today()) \
        .select_related()
    serializer_class_discount = DiscountSerializer
    serializer_class_popular_products = MostPopularProductsOrderedSerializer

    def get_queryset_most_popular_products_ordered(self):
        return ProductOrdered.objects \
            .filter(
                order_id__date_of_order__gte=timezone.now() - timedelta(days=30),
                product__quantity__gt=0
            ) \
            .values(
                "product_id",
                "product__brand",
                "product__model",
                "product__options",
                "product__price",
                "product__quantity",
                "product__picture"
            ) \
            .annotate(Count("product_id")) \
            .order_by("product_id__count") \
            .reverse()[0:10]

    def get(self,request, *args, **kwargs):
        discounts = self.serializer_class_discount(
            self.queryset_discounts,
            many=True,
        )
        most_popular = self.serializer_class_popular_products(
            self.get_queryset_most_popular_products_ordered(),
            many=True,
            context={"request": request}
        )
        return Response({
            'discounts': discounts.data,
            'most_popular': most_popular.data
        })


class CategoryFiltersView(generics.GenericAPIView):
    serializer_class = CategoryFilterSerializer

    def get_queryset(self, category=None):
        queryset = CategoryFilter.objects.get(category = self.kwargs['category'])
        return queryset

    def get(self, request, *args, **kwargs):
        options = self.serializer_class(self.get_queryset())
        return Response(options.data)


class SearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend ,filters.OrderingFilter]
    ordering_fields = ['price']
    filterset_class = ProductSearchFilter


class OrderStatusView(APIView):
    def get(self,request, orderid= None):
        order = Order.objects.get(id=orderid)
        serializer = CheckOrderStatusSerializer(order)
        return Response(serializer.data)


class OrderStatusView(APIView):
    def get(self,request, orderid= None):
        order = Order.objects.get(id=orderid)
        serializer = CheckOrderStatusSerializer(order)
        return Response(serializer.data)


@method_decorator(csrf_exempt, name="dispatch")
class ProcessWebhookView(APIView):
    def post(self, request):
        if "HTTP_PAYPAL_TRANSMISSION_ID" not in request.META:
            return HttpResponseBadRequest()

        auth_algo = request.META['HTTP_PAYPAL_AUTH_ALGO']
        cert_url = request.META['HTTP_PAYPAL_CERT_URL']
        transmission_id = request.META['HTTP_PAYPAL_TRANSMISSION_ID']
        transmission_sig = request.META['HTTP_PAYPAL_TRANSMISSION_SIG']
        transmission_time = request.META['HTTP_PAYPAL_TRANSMISSION_TIME']
        webhook_id = settings.PAYPAL_WEBHOOK_ID
        event_body = request.body.decode(request.encoding or "utf-8")

        valid = notifications.WebhookEvent.verify(
            transmission_id=transmission_id,
            timestamp=transmission_time,
            webhook_id=webhook_id,
            event_body=event_body,
            cert_url=cert_url,
            actual_sig=transmission_sig,
            auth_algo=auth_algo,
        )

        if not valid:
            return HttpResponseBadRequest()

        webhook_event = json.loads(event_body)
        order_id = webhook_event["resource"]["purchase_units"][0]["reference_id"]
        amount_paid = webhook_event["resource"]["purchase_units"][0]["amount"]["value"]
        order = Order.objects.get(id=order_id)

        if Decimal(order.total_price) == Decimal(amount_paid):
            order.order_state = 'PAYMENT_RECEIVED'
            order.save()
            send_payment_confirmation(order=order)

        return HttpResponse()


class OptionView(generics.GenericAPIView):
    def get(self,request,format=None,category=None):
        category = category
        template = OptionsTemplate.objects.get(category=category)
        serializer = TemplateSerializer(template, context={"request": request})
        return Response(serializer.data)


class ProductView(generics.GenericAPIView):
    def get(self,request,format=None,pk=None):
        id = pk

        product = Product.objects.get(id=id)
        serializer = ProductDetailsSerializer(product)

        try:
            discount = Discount.objects.get(product__id=id)
            serializer_discount = CategoryDiscountSerializer(discount)
            return Response({
                "product": serializer.data,
                "discount": serializer_discount.data
            })
        except Discount.DoesNotExist:
            return Response({"product" : serializer.data})



class CategoryView(generics.ListAPIView):
    serializer_class = CategorySerializer
    serializer_class_discounts = CategoryDiscountSerializer

    def get_queryset(self):
        get_parameters = self.request.GET.copy()
        category = self.kwargs['category']

        #remove order_by from params list and add later
        #so we can pass other argumets
        order_by = ''
        if 'order_by' in get_parameters.keys():
            order_by = get_parameters['order_by']
            del get_parameters['order_by']

        filter_by_price = {}
        if 'price_min' in get_parameters:
            filter_by_price['price__gte'] = float(get_parameters['price_min'])
            del get_parameters['price_min']
        if 'price_max' in get_parameters:
            filter_by_price['price__lte'] = float(get_parameters['price_max'])
            del get_parameters['price_max']

        products = Product.objects.filter(category=category, **get_parameters, **filter_by_price)

        #ordering by property, if you want order in reverse, add '-' in front of word
        if order_by:
            if order_by[0] == '-':
                return products.order_by(order_by[1:]).reverse()
            return products.order_by(order_by)
        return products

    def get_queryset_discounts(self):
        category = self.kwargs['category']
        return Discount.objects.filter(product__category=category, begins__lte=date.today(), ends__gt=date.today())

    def get(self,request, *args, **kwargs):
        category = self.serializer_class(self.get_queryset(), many=True)
        discounts = self.serializer_class_discounts(self.get_queryset_discounts(), many=True)
        return Response({
            'result': category.data,
            'discounts': discounts.data
        })


class NewOrderView(generics.CreateAPIView):
    serializer_class = NewOrderSerializer
    def perform_create(self, serializer):
        return serializer.save()


class CreateProductOrderedView(generics.CreateAPIView):
    serializer_class = ProductOrderedSerializer
    queryset = ProductOrdered.objects.all()
    http_method_names = ['post'] 

    def create(self,request):
        response_list = []
        for product in request.data:
            serializer = self.get_serializer(data=product)
            serializer.is_valid(raise_exception=True)

            valid_product = serializer.validated_data['product']
            if(valid_product.quantity < serializer.validated_data['quantity']):
                all_products_for_this_order = ProductOrdered.objects.filter(
                    order=serializer.validated_data['order']
                )
                all_products_for_this_order.delete()
                return Response(
                    {"error": "One of the products you've tried to order, is out of stock"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            self.perform_create(serializer)
            response_list.append(serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(response_list, status=status.HTTP_201_CREATED, headers=headers)