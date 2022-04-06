from django.contrib import admin
from .models import Order, Product, OptionsTemplate, ProductOrdered

admin.site.register(Product)
admin.site.register(OptionsTemplate)
admin.site.register(Order)
admin.site.register(ProductOrdered)