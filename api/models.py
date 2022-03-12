from django.db import models

def images_dir_path(instance, filename):
    return f'imaged{filename}'

class Product(models.Model):
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    picture = models.ImageField(upload_to=images_dir_path,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    view_count = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.brand} {self.model}'
