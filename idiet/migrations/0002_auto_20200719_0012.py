# Generated by Django 3.0.4 on 2020-07-18 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('idiet', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='meal_recommandetion',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]
