from rest_framework import serializers
from .models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['title', 'price', 'category', 'created_at', 'id']
        read_only_fields = ['id']