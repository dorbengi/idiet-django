# Generated by Django 3.0.4 on 2020-07-17 20:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='meal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meal_date_crated', models.DateField(auto_now_add=True)),
                ('meal_date', models.DateField(blank=True, null=True)),
                ('meal_type', models.CharField(max_length=20)),
                ('meal_calories', models.CharField(max_length=10)),
                ('meal_ingredients', models.CharField(max_length=300)),
                ('meal_recommandetion', models.CharField(max_length=300)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
