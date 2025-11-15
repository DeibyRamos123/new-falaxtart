from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .comment import *

urlpatterns = [
    path('view-all-comments/', comments, name='comments'),
    path('user-comment/<int:id>', obtain_comment, name='obtain_comment'),
    path('create-comment/', create_comment, name='create_comment'),
    path('comments-publication/<int:pub_id>', obtain_comment_publication, name='get_publications_comments')
]