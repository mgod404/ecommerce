from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver
from .models import Order, Product, ProductOrdered

@receiver(post_delete, sender=ProductOrdered)
def delete_order_if_empty(sender, instance, **kwargs):
    order_id = instance.order_id
    products_in_order = sender.objects.filter(order_id=order_id)
    if len(products_in_order) == 0:
        order = Order.objects.get(id=order_id)
        order.delete()

@receiver(post_delete, sender=ProductOrdered)
@receiver(pre_save, sender=ProductOrdered)
def update_total_price(sender,instance, **kwargs):
    old_quantity = sender.objects.get(id=instance.id).quantity
    new_quantity = instance.quantity
    product_price = instance.product.price
    quantity_difference = new_quantity - old_quantity
    order = Order.objects.get(id=instance.order_id)
    new_total_price = order.total_price + (product_price * quantity_difference)
    order.total_price = new_total_price
    order.save()
