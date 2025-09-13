from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .publications import *

urlpatterns = [
    path('create-publication/', upload_publication, name="create_publication"),
    path('user-publications/<int:id>',my_publications,name='my_publications'),
    path('publication-obtain/<int:id>/', obtain_publication, name='obtain_publication'),
    path('publications/', publications, name='publications'),
]