from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver
from .models import Order, Product, ProductOrdered


@receiver(pre_save, sender=ProductOrdered)
def update_product_quantity(sender, instance, **kwargs):
    product_id = instance.product_id
    product = Product.objects.get(id=product_id)
    product.quantity -= instance.quantity
    product.save()
    return


@receiver(post_delete, sender=ProductOrdered)
@receiver(pre_save, sender=ProductOrdered)
def update_total_price(sender,instance, **kwargs):
    ordered_product_in_db = sender.objects.filter(id=instance.id)
    new_quantity = instance.quantity
    product_price = instance.product.price
    order = Order.objects.get(id=instance.order_id)

    if not ordered_product_in_db:
        new_total_price = order.total_price + (product_price * new_quantity)
        order.total_price = new_total_price
        order.save()
        return

    old_quantity = ordered_product_in_db[0].quantity
    quantity_difference = new_quantity - old_quantity
    new_total_price = order.total_price + (product_price * quantity_difference)
    order.total_price = new_total_price
    order.save()


@receiver(post_delete, sender=ProductOrdered)
def delete_order_if_empty(sender, instance, **kwargs):
    order_id = instance.order_id
    products_in_order = sender.objects.filter(order_id=order_id)

    if len(products_in_order) == 0:
        order = Order.objects.get(id=order_id)
        order.delete()


