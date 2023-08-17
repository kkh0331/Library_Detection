from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('reservations', ReservationViewSet, basename='reservations')
# router.register('dummyModel', DummyModelViewSet, basename='dummyModel')

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', upload_image, name='upload_image')
]
