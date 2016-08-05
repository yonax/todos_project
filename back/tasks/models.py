from django.db import models
from positions.fields import PositionField

class Card(models.Model):
    name = models.CharField(max_length=255)
    position = PositionField(default=-1)

    class Meta:
        ordering = ('position', )
        
    def __str__(self):
        return self.name

class Task(models.Model):
    card = models.ForeignKey(Card, related_name='tasks')
    text = models.CharField(max_length=255)
    done = models.BooleanField(default=False)
    position = PositionField(collection='card', default=-1)

    class Meta:
        ordering = ('position', )

    def __str__(self):
        return '"{}" - {}'.format(self.text, 'done' if self.done else 'undone')
