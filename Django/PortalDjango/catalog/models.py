import os
from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User Model
class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    addresses = models.TextField(blank=True, null=True)  

# File Upload Model
class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def file_extension(self):
        return os.path.splitext(self.file.name)[1].lower()