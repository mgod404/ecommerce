from django.urls import path, include
from .views import *

urlpatterns = [
    path('', LoginView.as_view()),
    path('auth/', authentication),
    path('logout/', logout_view),
    path('home/', HomeView.as_view(), name='home'),

    path('home/orders/', OrdersView.as_view(), name='orders'),
    path('home/orders/<int:pk>/', UpdateOrderView.as_view(), name='update-order'),
    path('update_order_quantity/<int:pk>/', UpdateQuantityView.as_view(), name='update-order-quantity'),
    path('delete_ordered_product/<int:pk>/', DeleteOrderedProductView.as_view(), name='delete-product-ordered'),

    path('home/create_new_product/', CreateNewProductView.as_view(), name='create-new-product'),

    path('home/discounts/', DiscountsView.as_view(), name='discounts'),
    path('home/discounts/create_new_discount/', CreateNewDiscountView.as_view(), name='create-discount'),
    path('home/discounts/delete_discount/<int:pk>/', DeleteDiscountView.as_view(), name='delete-discount'),
    path('home/discounts/update_discount/<int:pk>/', UpdateDiscountView.as_view(), name='update-discount')
]