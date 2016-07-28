from django.db import models

class Task(models.Model):
    text = models.CharField(max_length=255)
    done = models.BooleanField(default=False)
