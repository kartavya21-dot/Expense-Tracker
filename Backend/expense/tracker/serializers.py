from rest_framework import serializers
from .models import Expense, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class ExpenseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Expense
        fields = ['title', 'price', 'category', 'created_at', 'id']
        read_only_fields = ['id']

    def create(self, validated_data):
        # Pop the nested category dict
        category_data = validated_data.pop("category")  # e.g., {"name": "Food"}
        
        # Get or create Category instance
        category, _ = Category.objects.get_or_create(**category_data)
        
        # Create Expense with category as keyword argument
        expense = Expense.objects.create(category=category, **validated_data)
        
        return expense