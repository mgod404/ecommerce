from .models import Product, Order
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

class NewOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        exclude = ['total_price']