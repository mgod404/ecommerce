from django.db import models

class Product(models.Model):
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    #picture = models.ImageField(null=True, blank=True) // to add later 
    description = models.TextField(null=True, blank=True)

    def __str__():
        return f'{self.brand} {self.model}'