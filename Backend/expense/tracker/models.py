from django.db import models

# Create your models here.
class Expense(models.Model):
    title = models.CharField(max_length=50)
    price = models.IntegerField()
    category = models.CharField(null=True)
    created_at = models.DateTimeField()
    
    def __str__(self):
        return self.title