from django.urls import path
from . import views

urlpatterns = [
    path('mostpopular/', views.MostPopularProducts.as_view()),
    path('p/<int:pk>/', views.ProductView.as_view()),
    path('c/<str:category>/', views.CategoryView.as_view()),
    path('neworder/', views.NewOrderView.as_view())
]