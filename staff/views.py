from multiprocessing import context
from django.urls import reverse_lazy
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.views.generic.edit import UpdateView, DeleteView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect, HttpResponseRedirect
from api.models import Order, ProductOrdered
from .forms import OrderModelForm, QuantityModelForm
class UserLoggedInMixin(LoginRequiredMixin):
    login_url = '/staff/'
    redirect_field_name = login_url


class CreateNewProductView(UserLoggedInMixin, CreateView):
    pass
class DeleteOrderedProductView(UserLoggedInMixin, DeleteView):
    template_name = 'staff/deleteproductordered.html'
    form_class = QuantityModelForm
    queryset = ProductOrdered.objects.all()
    success_url = '/staff/home/orders/'
class UpdateQuantityView(UserLoggedInMixin,UpdateView):
    template_name = 'staff/updateorderquantity.html'
    form_class = QuantityModelForm
    queryset = ProductOrdered.objects.all()
    success_url = '/staff/home/orders/'
class UpdateOrderView(UserLoggedInMixin, UpdateView):
    template_name = 'staff/orderdetail.html'
    form_class = OrderModelForm
    queryset = Order.objects.all()
    success_url = '/staff/home/orders/'

    def get_context_data(self, **kwargs):
        context = super(UpdateOrderView, self).get_context_data(**kwargs)
        context['products_ordered'] = ProductOrdered.objects.filter(order_id=self.kwargs['pk'])
        return context
class OrdersView(UserLoggedInMixin, ListView):
    template_name = "staff/orders.html"
    model = Order
    paginate_by = 100
    ordering = 'date_of_order'

class LoginView(TemplateView):
    template_name = "staff/login.html"

class HomeView(UserLoggedInMixin, TemplateView):
    template_name = "staff/home.html"



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