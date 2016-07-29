from django.db import models

class Card(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Task(models.Model):
    card = models.ForeignKey(Card, related_name='tasks')
    text = models.CharField(max_length=255)
    done = models.BooleanField(default=False)

    def __str__(self):
        return '"{}" - {}'.format(self.text, 'done' if self.done else 'undone')
