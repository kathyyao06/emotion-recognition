// src/pages/EmotionRecognition.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./EmotionRecognition.css";


const EmotionRecognition = () => {
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const startVideo = async () => {
    if (videoRef.current && videoRef.current.srcObject) return;
  
    try {
      const video = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = video;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => {
            console.error("Error playing video:", err);
          });
        };
      }
    } catch (err) {
      console.error("Webcam error:", err);
    }
  };
  
  const predictEmotion = async () => {
    if (!videoRef.current || !canvasRef.current) {
        return;
    }

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");
    
          try {
            const response = await axios.post("http://localhost:8000/ml/predict/", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
    
            setResult(response.data);
          } catch (err) {
            console.error("Error uploading frame:", err);
          }
        }
      }, "image/jpeg");
  };

  useEffect(() => {
    startVideo();
    intervalRef.current = setInterval(predictEmotion, 1000);

    return () => {
      clearInterval(intervalRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="emotion-recognition">
      <h2>Emotion Recognition (Video Input)</h2>
      <p>Make sure your face is large and centered in video feed.</p>
      <div className="example-image">
        <p>Example Video Image Input: </p>
        <img src="/emotionImages/Happy3.jpg" className="emotion-img"/>
      </div>

      <div className="video-container">
        <video ref={videoRef} className="video-feed" />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      {result && (
        <div className="result">
          <h3>Detected Emotion: {result.emotion}</h3>
        </div>
      )}
    </div>
  );
};

export default EmotionRecognition;
