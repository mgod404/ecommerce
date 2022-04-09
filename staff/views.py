from multiprocessing import context
from django.urls import reverse_lazy
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.views.generic.edit import UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from api.models import Order, ProductOrdered
from .forms import OrderModelForm, QuantityModelForm

class DeleteOrderedProductView(LoginRequiredMixin, DeleteView):
    login_url = '/staff/'
    redirect_field_name = login_url
    template_name = 'staff/deleteproductordered.html'
    form_class = QuantityModelForm
    queryset = ProductOrdered.objects.all()
    success_url = reverse_lazy('update-order')
class UpdateQuantityView(LoginRequiredMixin,UpdateView):
    login_url = '/staff/'
    redirect_field_name = login_url
    template_name = 'staff/updateorderquantity.html'
    form_class = QuantityModelForm
    queryset = ProductOrdered.objects.all()
    success_url = reverse_lazy('update-order')
class UpdateOrderView(LoginRequiredMixin, UpdateView):
    login_url = '/staff/'
    redirect_field_name = login_url
    template_name = 'staff/orderdetail.html'
    form_class = OrderModelForm
    queryset = Order.objects.all()
    success_url = reverse_lazy('update-order')

    def get_context_data(self, **kwargs):
        context = super(UpdateOrderView, self).get_context_data(**kwargs)
        context['products_ordered'] = ProductOrdered.objects.filter(order_id=self.kwargs['pk'])
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