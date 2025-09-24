from django.contrib import admin
from django.urls import path, include
from tracker.views import TrackerViewSet, CategoryViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tracker', TrackerViewSet, basename='tracker')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]