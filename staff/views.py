from multiprocessing import context
from re import L
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.views.generic.edit import UpdateView, DeleteView
from django.views.generic.detail import DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from api.models import Order, Product, ProductOrdered

def UpdateOrderQuantityView(request):
    quantity = request.POST['quantity']
    product_id = request.POST['product_id']
    update = ProductOrdered.objects.get(product_id=product_id).update(quantity=quantity)
    update.save()
    return
class OrderDetailView(LoginRequiredMixin, ListView):
    login_url = '/staff/'
    redirect_field_name = login_url
    template_name = 'staff/orderdetail.html'
    context_object_name = 'products_ordered'

    def get_queryset(self):
        queryset = ProductOrdered.objects.filter(order=self.kwargs['pk'])
        return queryset
    def get_context_data(self, **kwargs):
        context = super(OrderDetailView, self).get_context_data(**kwargs)
        context['order_details'] = Order.objects.get(id=self.kwargs['pk'])
        return context
class OrdersView(LoginRequiredMixin, ListView):
    template_name = "staff/orders.html"
    login_url = '/staff/'
    redirect_field_name = login_url
    model = Order
    paginate_by = 100
    ordering = 'date_of_order'

class LoginView(TemplateView):
    template_name = "staff/login.html"

class HomeView(LoginRequiredMixin, TemplateView):
    template_name = "staff/home.html"
    login_url = '/staff/'
    redirect_field_name = login_url

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