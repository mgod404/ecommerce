import decimal
import json

from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response

from paypalrestsdk import notifications

from .models import *
from .serializers import *


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

        if decimal(order.total_price) == decimal(amount_paid):
            order.order_state = 'PAYMENT_RECEIVED'
            order.save()

        return HttpResponse()


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductOrderedSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['brand', 'model']


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
        serializer = ProductDetailsSerializer(product, context={"request": request})
        return Response(serializer.data)


class CategoryView(generics.ListAPIView):
    serializer_class = CategorySerializer    
    def get_queryset(self):
        category = self.kwargs['category']
        return Product.objects.filter(category=category)


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
            self.perform_create(serializer)
            response_list.append(serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(response_list, status=status.HTTP_201_CREATED, headers=headers)