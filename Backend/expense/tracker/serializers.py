from rest_framework import serializers
from .models import Expense, Category
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'id']
    

class ExpenseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Expense
        fields = ['title', 'price', 'category', 'created_at', 'id', 'user']
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        # Pop the nested category dict
        category_data = validated_data.pop("category")
        user = self.context["request"].user  # get current logged-in user

        category, _ = Category.objects.get_or_create(
            name=category_data["name"], 
            user=user  # filter category by user
        )

        expense = Expense.objects.create(category=category, user=user, **validated_data)
        return expense