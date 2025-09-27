from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")

    class Meta:
        unique_together = ("name", "user") 


class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expense")
    title = models.CharField(max_length=50)
    price = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField()
    
    def __str__(self):
        return self.title