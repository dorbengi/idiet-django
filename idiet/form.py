from django.forms import ModelForm
from .models import meal

class AddMealForm(ModelForm):
  class Meta:
      model = meal
      fields = [ 'meal_type', 'meal_ingredients']


class addRecommand(ModelForm):
  class Meta:
      model = meal
      fields = [ 'meal_recommandetion']