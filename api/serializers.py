from .models import *
from rest_framework import serializers

class CategoryFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryFilter
        fields = ['filters']


class CheckOrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_state']


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionsTemplate
        fields = ['options']


class ProductDetailsSerializer(serializers.ModelSerializer):
    in_stock = serializers.SerializerMethodField()
    class Meta:
        model = Product
        exclude = ['quantity']

    def get_in_stock(self, obj):
        if(obj.quantity > 10):
            return 'in stock'
        if(obj.quantity < 10 and obj.quantity > 0):
            return 'low stock'
        if(obj.quantity == 0):
            return 'out of stock'


class CategorySerializer(ProductDetailsSerializer):
    in_stock = None
    class Meta:
        model = Product
        exclude = ['description', 'quantity']


class NewOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        exclude = ['total_price']


class ProductOrderedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOrdered
        fields = '__all__'