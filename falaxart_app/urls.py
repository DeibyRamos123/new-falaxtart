from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from falaxart_app.views import *


#api versioning


urlpatterns = [
    path('register/',register, name='register'),
    path('login/', login, name='login'),
    path('profile/<int:id>', profile, name='profile'),
    path('update/', update_profile, name="update_profile"),
    path('home/', home, name='home'),
    path('create-publication/', upload_publication, name="create_publication"),
    path('user-publications/<int:id>',my_publications,name='my_publications'),
    path('publication-obtain/<int:id>/', obtain_publication, name='obtain_publication'),
    path('publications/', publications, name='publications')
]