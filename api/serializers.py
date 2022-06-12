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

class DiscountSerializer(serializers.ModelSerializer):
    product = ProductDetailsSerializer()
    class Meta:
        model = Discount
        fields = ['ends', 'discount_in_number', 'discount_in_percentage', 'product']

class CategoryDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        exclude = ['id', 'begins']


class CategorySerializer(ProductDetailsSerializer):
    in_stock = None
    class Meta:
        model = Product
        exclude = ['description', 'quantity']


class NewOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        exclude = ['total_price']

class MostPopularProductsOrderedSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    product__brand = serializers.CharField(max_length=20)
    product__model = serializers.CharField(max_length=30)
    product__options = serializers.JSONField()
    product__price = serializers.DecimalField(max_digits=7, decimal_places=2)
    #picture field on "ImageField" always returned to null,
    #so I've made a walkaround 
    product__picture = serializers.SerializerMethodField()
    product_id__count = serializers.IntegerField()
    in_stock = serializers.SerializerMethodField()

    def get_product__picture(self, obj):
        picture_name = obj['product__picture']
        # request = self.context['request']
        # host = request.build_absolute_uri('/')
        url = f'/media/{picture_name}'
        return url

    def get_in_stock(self, obj):
        if(obj['product__quantity'] > 10):
            return 'in stock'
        if(obj['product__quantity'] < 10 and obj['product__quantity'] > 0):
            return 'low stock'
        if(obj['product__quantity'] == 0):
            return 'out of stock'


class ProductOrderedSerializer(serializers.ModelSerializer):
    def validate_quantity(self, quantity):
        if quantity < 1:
            raise serializers.ValidateError('Out of stock')
        return quantity
    class Meta:
        model = ProductOrdered
        fields = '__all__'