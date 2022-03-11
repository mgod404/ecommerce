from django.http import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

def routes(request):
    pass

class MostPopularProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
