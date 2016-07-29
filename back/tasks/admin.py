from django.contrib import admin
from .models import Card, Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    pass

class TaskInline(admin.TabularInline):
    model = Task

@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    inlines = (TaskInline, )
