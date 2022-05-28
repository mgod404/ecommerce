from django.contrib import admin
from .models import Order, Product, OptionsTemplate, ProductOrdered, CategoryFilter, Discount

admin.site.register(Product)
admin.site.register(OptionsTemplate)
admin.site.register(CategoryFilter)
admin.site.register(Order)
admin.site.register(ProductOrdered)
admin.site.register(Discount)
