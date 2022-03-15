from .models import Product, SmartphoneVariant, ProductCategory
from rest_framework import serializers

class SmartphoneVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmartphoneVariant
        fields = ['color', 'price', 'screen_size', 'memory', 'picture']

class ProductSerializer(serializers.ModelSerializer):
    variants = SmartphoneVariantSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['brand', 'model', 'variants']

class ProductCategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = ProductCategory
        fields = ['name','products']
