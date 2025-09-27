from django.shortcuts import render
from rest_framework.permissions import AllowAny
from .serializers import ExpenseSerializer, CategorySerializer, RegisterSerializer
from rest_framework import viewsets, permissions, generics
from .models import Expense, Category
from datetime import datetime

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Create your views here.
class TrackerViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    
    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)
        ordering = self.request.query_params.get('ordering', '-created_at')

        if ordering in ['created_at', '-created_at']:
            queryset = queryset.order_by(ordering)
        
        date_filter = self.request.query_params.get('date', None)
        print(date_filter, " ")
        
        if date_filter:
            try:
                filter_date = datetime.strptime(date_filter, '%Y-%m-%d').date()
                queryset = queryset.filter(created_at__date=filter_date)
            except ValueError:
                pass
        
        return queryset