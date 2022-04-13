from urllib import response
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

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