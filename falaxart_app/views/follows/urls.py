from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .follow_user import *

urlpatterns = [
    path('follow/', follow_profile_user , name='follow'),
    path('followers/', get_user_followers, name='user_followers'),
    path('remove-followers/', remove_follower, name='remove_followers')
]