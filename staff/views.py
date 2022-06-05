from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.views.generic.edit import UpdateView, DeleteView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect, get_object_or_404
from api.models import Order, ProductOrdered, Product, Discount
from .forms import DiscountForm, DiscountUpdateForm, OrderModelForm, QuantityModelForm, DeleteProductOrderedForm, NewProductModelForm


class UserLoggedInMixin(LoginRequiredMixin):
    login_url = '/staff/'
    redirect_field_name = login_url


class UpdateDiscountView(UserLoggedInMixin,UpdateView):
    template_name = 'staff/updatediscount.html'
    form_class = DiscountUpdateForm
    queryset = Discount.objects.all()
    success_url = '/staff/home/discounts/'

class DeleteDiscountView(UserLoggedInMixin, DeleteView):
    template_name = 'staff/deletediscount.html'
    model = Discount
    success_url = '/staff/home/discounts/'

class DiscountsView(UserLoggedInMixin, ListView):
    template_name = "staff/discounts.html"
    model = Discount
    paginate_by = 100
    ordering = 'ends'

class CreateNewDiscountView(UserLoggedInMixin, CreateView):
    template_name = 'staff/createnewdiscount.html'
    form_class = DiscountForm
    queryset = Discount.objects.all()
    success_url = '/staff/home/discounts/'

class CreateNewProductView(UserLoggedInMixin, CreateView):
    template_name = 'staff/createnewproduct.html'
    form_class = NewProductModelForm
    queryset = Product.objects.all()
    success_url = '/staff/home/'

class DeleteOrderedProductView(UserLoggedInMixin, DeleteView):
    template_name = 'staff/deleteproductordered.html'
    model = ProductOrdered
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