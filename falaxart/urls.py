from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('falaxart/api/users/v1/',include('falaxart_app.views.users.urls')),
    path('falaxart/api/publications/v1/', include('falaxart_app.views.publications.urls')),
    path('falaxart/api/comments/v1/', include('falaxart_app.views.comments.urls')),
    path('falaxart/api/follows/v1/', include('falaxart_app.views.follows.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)