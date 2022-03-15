from django.http import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, SmartphoneVariant, ProductCategory
from .serializers import ProductSerializer, SmartphoneVariantSerializer, ProductCategorySerializer

def routes(request):
    pass

class MostPopularProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductView(APIView):
    def get(self,request,format=None,pk=None):
        id = pk 
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

class SmartphoneVariantView(APIView):
    def get(self,request):
        variants = SmartphoneVariant.objects.all()
        serializer = SmartphoneVariantSerializer(variants)
        return Response(serializer.data)

class ProductCategoryView(APIView):
    def get(self,request,category=None):
        category = ProductCategory.objects.get(name=category)
        serializer = ProductCategorySerializer(category)
        return Response(serializer.data)