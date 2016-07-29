from rest_framework import viewsets
from .serializers import TaskSerializer, CardSerializer
from .models import Task, Card

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.prefetch_related('tasks')
    serializer_class = CardSerializer
