"""fd_idiet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from idiet import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # login
    path('dashboard/', views.dashboard, name='dashboard'),
    path('', views.homepage, name='homepage'),
    path('logout/', views.logoutuser, name='logoutuser'),
    path('login/', views.loginuser, name='loginuser'),
    path('register/', views.registerform, name='registerform'),

    # CRUD
    path('mymeals/', views.mymeals, name='mymeals'),
    path('createnewmeal/', views.createnewmeal, name='createnewmeal'),
    path('meal/<int:meal_pk>/', views.updatemeal, name='updatemeal'),
    path('meal/<int:meal_pk>/delete', views.delete, name='delete'),

    # users
    path('allmeals/', views.allmeals, name='allmeals'),
    path('assigntome/<int:meal_pk>', views.assigntome, name='assigntome'),
]
