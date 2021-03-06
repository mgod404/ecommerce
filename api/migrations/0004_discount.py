# Generated by Django 4.0.3 on 2022-05-27 00:55

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_categoryfilter_alter_order_order_state'),
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('begins', models.DateField(default=datetime.date.today)),
                ('ends', models.DateField()),
                ('discount_in_number', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('discount_in_percentage', models.DecimalField(decimal_places=2, default=0, max_digits=4)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.product')),
            ],
        ),
    ]
