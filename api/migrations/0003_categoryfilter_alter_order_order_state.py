# Generated by Django 4.0.3 on 2022-04-17 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_order_options_order_order_state'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryFilter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=20)),
                ('filters', models.JSONField()),
            ],
        ),
        migrations.AlterField(
            model_name='order',
            name='order_state',
            field=models.CharField(default='WAITING_FOR_PAYMENT', max_length=20),
        ),
    ]
