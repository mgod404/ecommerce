from .models import Product
from rest_framework import serializers


class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ['description', 'amount']
# context={'category':instance.__str__()}
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
