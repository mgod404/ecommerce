from django.db import models
from datetime import date


def images_dir_path(instance,filename):
    return filename


class Product(models.Model):
    category = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=30)
    options = models.JSONField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    picture = models.ImageField(upload_to=images_dir_path,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f'{self.category}, {self.brand} {self.model}'


class OptionsTemplate(models.Model):
    category = models.CharField(max_length=20)
    options = models.JSONField()
    def __str__(self):
        return self.category


class Order(models.Model):
    ORDER_STATE = [
        ('WAITING_FOR_PAYMENT', 'WAITING FOR PAYMENT'),
        ('PAYMENT_RECEIVED', 'PAYMENT RECEIVED'),
        ('ORDER_SHIPPED', 'ORDER SHIPPED')
    ]
    total_price = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    date_of_order = models.DateTimeField(auto_now_add=True)
    order_state = models.CharField(max_length=20, default="WAITING_FOR_PAYMENT")
    email = models.EmailField()
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=40)
    address = models.CharField(max_length=80)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=20)
    zip = models.CharField(max_length=10)
    class Meta:
        ordering =  ['-id']
    def __str__(self):
        return f'{self.email} {self.date_of_order}'


class ProductOrdered(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    def __str__(self):
        return f'{self.order}, {self.product}, {self.quantity}'


class CategoryFilter(models.Model):
    category = models.CharField(max_length=20)
    filters = models.JSONField()
    def __str__(self) -> str:
        return f'{self.category} Filters'

class Discount(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    begins = models.DateField(default=date.today)
    ends = models.DateField()
    discount_in_number = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    discount_in_percentage = models.DecimalField(max_digits=4, decimal_places=2, default=0)