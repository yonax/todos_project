# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-02 01:07
from __future__ import unicode_literals

from django.db import migrations
import positions.fields


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_auto_20160729_0930'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ('position',)},
        ),
        migrations.AddField(
            model_name='task',
            name='position',
            field=positions.fields.PositionField(default=-1),
        ),
    ]
