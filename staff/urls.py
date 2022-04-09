from django.urls import path, include
from .views import *

urlpatterns = [
    path('', LoginView.as_view()),
    path('auth/', authentication),
    path('logout/', logout_view),
    path('home/', HomeView.as_view(), name='home'),
    path('home/orders/', OrdersView.as_view(), name='orders'),
    # path('home/orders/<int:pk>/',views.OrderDetailView.as_view()),
    path('home/orders/<int:pk>/', UpdateOrderView.as_view(), name='update-order'),
    path('update_order_quantity/<int:pk>/', UpdateQuantityView.as_view(), name='update-order-quantity'),
    path('delete_ordered_product/<int:pk>/', DeleteOrderedProductView.as_view(), name='delete-product-ordered')
]