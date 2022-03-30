from django.http import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductDetailsSerializer

def routes(request):
    pass

class MostPopularProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailsSerializer


class ProductView(generics.GenericAPIView):
    def get(self,request,format=None,pk=None):
        id = pk 
        product = Product.objects.get(id=id)
        serializer = ProductDetailsSerializer(product, context={"request": request})
        return Response(serializer.data)


class CategoryView(generics.ListAPIView):
    serializer_class = ProductDetailsSerializer    
    def get_queryset(self):
        category = self.kwargs['category']
        return Product.objects.filter(category=category)
