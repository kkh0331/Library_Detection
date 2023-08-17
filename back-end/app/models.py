from django.db import models


# Create your models here.
class Reservation(models.Model):
    seatNum  = models.CharField(max_length=5) #자리
    stuNum  = models.CharField(max_length=20) #학번
    seatStatus = models.CharField(max_length=15, default='USE') #자리상태
    count = models.IntegerField(default=0) #상태count

# class DummyModel(models.Model):
#     className = models.CharField(max_length=15, primary_key=True)
#     classCount = models.IntegerField()