from django.db import models
from sqlalchemy import false

def images_dir_path(instance, filename):
    return f'imaged{filename}'

class Product(models.Model):
    category = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=30)
    options = models.JSONField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    picture = models.ImageField(upload_to=images_dir_path,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    amount = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.category}, {self.brand} {self.model}'

class OptionsTemplate(models.Model):
    category = models.CharField(max_length=20)
    options = models.JSONField()
    def __str__(self):
        return self.category

class Order(models.Model):
    products_ordered = models.ManyToManyField(Product, blank=False)
    total_price = models.DecimalField(max_digits=9, decimal_places=2)
    date_of_order = models.DateTimeField(auto_now_add=True)
    # email = models.EmailField()
    # name = models.CharField(max_length=30)
    # surname = models.CharField(max_length=40)
    # address = models.CharField(max_length=80)
    # city = models.CharField(max_length=30)
    # state = models.CharField(max_length=20)
    # zip = models.CharField(max_length=10)

