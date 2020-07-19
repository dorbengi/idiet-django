from django.db import models
from django.contrib.auth.forms import User

class meal(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    meal_date_crated = models.DateField(auto_now_add=True)
    meal_date = models.DateField(null=True,blank=True)
    meal_type = models.CharField(max_length=20)
    meal_calories = models.CharField(max_length=10)
    meal_ingredients = models.CharField(max_length=300)
    meal_recommandetion = models.CharField(max_length=300,null=True,blank=True)

def __str__(self):
  return self.meal_ingredients