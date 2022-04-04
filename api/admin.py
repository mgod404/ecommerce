from django.contrib import admin
from .models import Order, Product, OptionsTemplate

admin.site.register(Product)
admin.site.register(OptionsTemplate)
admin.site.register(Order)