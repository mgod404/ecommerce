from django.shortcuts import render
from django.views.generic.list import ListView
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from api.models import Order

class OrdersView(LoginRequiredMixin, ListView):
    template_name = "orders/orders.html"
    login_url = '/staff/'
    redirect_field_name = login_url
    model = Order
    paginate_by = 100