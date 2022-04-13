from django.urls import path
from . import views

urlpatterns = [
    path('p/<int:pk>/', views.ProductView.as_view()),
    path('c/<str:category>/', views.CategoryView.as_view()),
    path('neworder/', views.NewOrderView.as_view()),
    path('productordered/', views.CreateProductOrderedView.as_view()),
    path('options/<str:category>/', views.OptionView.as_view())
]