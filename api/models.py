from django.db import models

def images_dir_path(instance, filename):
    return f'imaged{filename}'

class ProductCategory(models.Model):
    name = models.CharField(max_length=20)
    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(ProductCategory,related_name='products', on_delete=models.CASCADE)
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=30)
    def __str__(self):
        return f'{self.brand} {self.model}'

class SmartphoneVariant(models.Model):
    product = models.ForeignKey(Product, related_name='smartphonevariants', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6,decimal_places=2)
    color = models.CharField(max_length=20)
    screen_size = models.DecimalField(max_digits=3,decimal_places=1)
    processor = models.CharField(max_length=20)
    memory = models.IntegerField()
    operating_system = models.CharField(max_length=20)
    picture = models.ImageField(upload_to=images_dir_path,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    amount = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.product} {self.color}'

class LaptopVariant(models.Model):
    product = models.ForeignKey(Product, related_name='laptopvariants', on_delete=models.CASCADE)
    screen_size = models.DecimalField(max_digits=3,decimal_places=1)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    color = models.CharField(max_length=20)
    memory = models.IntegerField()
    operating_system = models.CharField(max_length=10, blank=True)
    processor = models.CharField(max_length=20)
    graphics_card = models.CharField(max_length=20, blank=True)
    picture = models.ImageField(upload_to=images_dir_path,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    amount = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.product} {self.color}'

class TvVariant(models.Model):
    product = models.ForeignKey(Product, related_name='tvvariants', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    color = models.CharField(max_length=20)
    screen_size = models.IntegerField()
    picture = models.ImageField(upload_to=images_dir_path,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    amount = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.product} {self.screen_size}'