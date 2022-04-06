from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from api.models import Order

class LoginView(TemplateView):
    template_name = "staff/login.html"

class HomeView(LoginRequiredMixin, TemplateView):
    template_name = "staff/home.html"
    login_url = '/staff/'
    redirect_field_name = login_url

class OrdersView(LoginRequiredMixin, ListView):
    template_name = "staff/orders.html"
    login_url = '/staff/'
    redirect_field_name = login_url
    model = Order
    paginate_by = 100

def authentication(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return redirect('/staff/home/')
    else:
        return redirect('/staff/')

def logout_view(request):
    logout(request)
    return redirect('/staff/')