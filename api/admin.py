from django.contrib import admin
from .models import ProductCategory, Product, SmartphoneVariant, LaptopVariant, TvVariant

admin.site.register(ProductCategory)
admin.site.register(Product)
admin.site.register(SmartphoneVariant)
admin.site.register(LaptopVariant)
admin.site.register(TvVariant)