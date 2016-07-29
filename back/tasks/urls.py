from rest_framework import routers
from .views import TaskViewSet, CardViewSet

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('cards', CardViewSet)

urlpatterns = router.urls
