from django.shortcuts import render
from .serializers import ExpenseSerializer, CategorySerializer
from rest_framework import viewsets, permissions, generics
from .models import Expense, Category
from datetime import datetime

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

# Create your views here.
class TrackerViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    
    def get_queryset(self):
        queryset = Expense.objects.all()
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