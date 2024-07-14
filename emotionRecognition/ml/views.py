from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import tensorflow as tf
import keras
import numpy as np
from PIL import Image
import os
import matplotlib.pyplot as plt
import base64
import io
import cv2

directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
modelPath = os.path.join(directory, 'models', 'emotionModel.h5')

if not os.path.exists(modelPath):
    print(f"Cannot find model.")
else: 
    model = keras.models.load_model(modelPath)

def preprocess_image(file_obj, save_path=None):
    img = Image.open(file_obj).convert('L')
    img = img.resize((48, 48))
    img_array = np.array(img)
    img_array = img_array.reshape((1, 48, 48, 1))

    if save_path:
        img.save(save_path)

    buffered = io.BytesIO()
    img.save(buffered, format="JPEG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return img_array, img_base64

class EmotionDetection(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            print("No file provided")
            return Response({"error": "No file provided"}, status=400)

        try:
            file_obj = request.FILES['file']

            save_dir = os.path.join(directory, 'preprocessed_images')
            os.makedirs(save_dir, exist_ok=True)
            save_path = os.path.join(save_dir, f"preprocessed_{file_obj.name}")
            
            img_array, img_base64 = preprocess_image(file_obj, save_path=save_path)

            predictions = model.predict(img_array) 
            emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
            emotion = emotions[np.argmax(predictions, axis = 1)[0]]

            # debugging purposes
            print(f"Prediction Probability: {predictions}")
            print(f"Prediction: {emotion}")

            return Response({'emotion': emotion, 'image': img_base64})
        except Exception as e:
            print(f"Error processing file: {e}")
            return Response({"error": "Error processing file"}, status=500)