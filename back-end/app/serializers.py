from rest_framework import serializers
from .models import *

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'seatNum', 'stuNum', 'seatStatus', 'count']


# class DummyModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DummyModel
#         fields = ['className', 'classCount']