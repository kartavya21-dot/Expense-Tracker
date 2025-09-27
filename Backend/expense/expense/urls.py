from django.contrib import admin
from django.urls import path, include
from tracker.views import TrackerViewSet, CategoryViewSet, RegisterView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'tracker', TrackerViewSet, basename='tracker')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token-refresh'),
    path('api/token/', TokenObtainPairView.as_view(), name='token-obtain_pair'),
    path('api/', include(router.urls)),
]
