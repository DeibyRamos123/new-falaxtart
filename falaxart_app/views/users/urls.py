from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .auth_user import *

urlpatterns = [
    path('register/',register, name='register'),
    path('login/', login, name='login'),
    path('profile/<int:id>', profile, name='profile'),
    path('update/', update_profile, name="update_profile"),
    path('home/', home, name='home'),
]