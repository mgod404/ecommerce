from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.LoginView.as_view()),
    path('auth/', views.authentication),
    path('logout/', views.logout_view),
    path('home/', views.HomeView.as_view()),
    path('home/orders/', views.OrdersView.as_view())
]