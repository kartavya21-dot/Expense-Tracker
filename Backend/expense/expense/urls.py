from django.contrib import admin
from django.urls import path, include
from tracker.views import TrackerViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tracker', TrackerViewSet, basename='track')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]