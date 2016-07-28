# -*- coding: utf-8 -*-

from django.conf import settings
from django.conf.urls import include, url
from django.views.generic import TemplateView
from django.contrib import admin

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    url(r'^api/', include('back.tasks.urls')),
    url(settings.ADMIN_URL, include(admin.site.urls)),
]
