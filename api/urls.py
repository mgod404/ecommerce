from django.urls import path
from . import views

urlpatterns = [
    path('mostpopular/', views.MostPopularProducts.as_view()),
]