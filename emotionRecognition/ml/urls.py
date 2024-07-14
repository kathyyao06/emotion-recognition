from django.urls import path
from .views import EmotionDetection

urlpatterns = [
    path('predict/', EmotionDetection.as_view(), name='predict'),
]