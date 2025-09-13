from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .comment import *

urlpatterns = [
    path('comments/view-all-comments/', comments, name='comments'),
    path('comments/user-comment/<int:id>', obtain_comment, name='obtain_comment'),
    path('comments/create-comment/', create_comment, name='create_comment')
]