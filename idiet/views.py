from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.forms import User
from django.db import IntegrityError
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .form import AddMealForm, addRecommand
from .models import meal

# HOMEPAGE
def homepage(request):
  return render(request, 'idiet/index.html')

# REGISTER
def registerform(request):
  if request.method == 'GET':
    return render(request, 'idiet/registerform.html', {'form':UserCreationForm()})
  
  else:
    # CREAT NEW USER
    if request.POST['password1'] == request.POST['password2']:
      try:
        user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])
        user.save()
        login(request, user)
        return redirect('dashboard')

      except IntegrityError:
        return render(request, 'idiet/registerform.html', {'form':UserCreationForm(), 'errMsg' : 'User alreadt exists'})

    else:
          return render(request, 'idiet/registerform.html', {'form':UserCreationForm(), 'errMsg' : 'Password did not match'})


# USER DASHBOARD
def dashboard(request):
  return render(request, 'idiet/dashboard.html')

# LOGOUT
def logoutuser(request):
  if request.method == 'POST':
    logout(request)
    return redirect('homepage')

# LOGIN
def loginuser(request):
  if (request.method == 'GET'):
    return render(request, 'idiet/loginform.html', {'form':AuthenticationForm()})
  else:
    user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
    if user is None:
      return render(request, 'idiet/loginform.html', {'form':AuthenticationForm(), 'errMas' : 'User does not  exists'})
    else:
      login(request, user)
      return redirect('dashboard')

# my meals
@login_required
def mymeals(request):
    meals = meal.objects.filter(user_id=request.user)
    return render(request, 'idiet/meals.html', {'meals':meals})

# create new meal
@login_required
def createnewmeal(request):
    if request.method == 'GET':
        return render(request, 'idiet/createnewmeal.html', {'form':AddMealForm()})
    else:
        try:
          form = AddMealForm(request.POST)
          newmeal = form.save(commit=False)
          newmeal.user_id = request.user
          newmeal.meal_calories = "389"
          newmeal.save()
          return redirect('mymeals')
        except ValueError:
          return render(request, 'idiet/createnewmeal.html', {'form':AddMealForm(), 'errMsg' : 'Check data'})


# update meal
@login_required
def updatemeal(request, meal_pk):
    mealObj = get_object_or_404(meal, pk=meal_pk, user_id=request.user)

    if request.method == 'GET':
      form = AddMealForm(instance=mealObj)
      return render(request, 'idiet/updatemeal.html', {'meal':mealObj, 'form':form})
    else:
      try:
        form = AddMealForm(request.POST, instance=mealObj)
        form.save()
        return redirect('mymeals')
      except ValueError:
        return render(request, 'idiet/updatemeal.html', {'form':AddMealForm(), 'errMsg' : 'Check data'})


# delete meal
@login_required
def delete(request, meal_pk):
    mealObj = get_object_or_404(meal, pk=meal_pk, user_id=request.user)
    if request.method == 'POST':
      mealObj.delete()
      return redirect('mymeals')


# get all  meals
@login_required
def allmeals(request):
    users = User.objects.all()
    meals = meal.objects.all()
    return render(request, 'idiet/allmeals.html', {'meals':meals, 'users' : users})


# assigntome
@login_required
def assigntome(request, meal_pk):
    mealObj = get_object_or_404(meal, pk=meal_pk)

    if request.method == 'GET':
      form = addRecommand(instance=mealObj)
      return render(request, 'idiet/editrecommand.html', {'meal':mealObj, 'form':form})
    else:
      try:
        form = addRecommand(request.POST,instance=mealObj)
        form.save()
        return redirect('allmeals')
      except ValueError:
        return render(request, 'idiet/editrecommand.html', {'form':addRecommand(), 'errMsg' : 'Check data'})


# # assigntome
# @login_required
# def assigntome(request, meal_pk):
#     mealObj = get_object_or_404(meal, pk=meal_pk)

#     if request.method == 'GET':
#       form = addRecommand()
#       return render(request, 'idiet/editrecommand.html', {'meal':mealObj, 'form':form})
#     else:
#       try:
#         mealObj.meal_recommandetion = "request.user.idcccccccccccccc"
#         mealObj.save()
#         return redirect('allmeals')
#       except ValueError:
#         return render(request, 'idiet/editrecommand.html', {'form':addRecommand(), 'errMsg' : 'Check data'})

