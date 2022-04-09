from re import L
from django.forms import ModelForm
from api.models import *

class OrderModelForm(ModelForm):
    class Meta:
        model = Order
        fields = [
            'email',
            'name',
            'surname',
            'address',
            'city',
            'state',
            'zip'
        ]
    def __init__(self, *args, **kwargs):
        super(OrderModelForm, self).__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
        })

class QuantityModelForm(ModelForm):
    class Meta:
        model = ProductOrdered
        fields = ['quantity']
    def __init__(self, *args, **kwargs):
        super(QuantityModelForm, self).__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class': 'form-control',
                'min': '1'
        })
