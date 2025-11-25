from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .follow_user import *

urlpatterns = [
    path('follow/', follow_profile_user , name='follow'),
    path('followers/<int:id>/', get_user_followers, name='user_followers'),
    path('remove-follower/<int:follower_id>/<int:following_id>/', remove_follower, name='remove_followers'),
    path('follow/status/<int:follower_id>/<int:following_id>/', check_follow_status, name='check-follow-status'),
]