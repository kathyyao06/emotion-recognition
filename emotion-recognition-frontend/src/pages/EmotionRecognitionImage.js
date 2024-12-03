// src/pages/EmotionRecognition.js
import React, { useState } from "react";
import axios from "axios";
import './EmotionRecognition.css';

const EmotionRecognition = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image or video file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/ml/predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (err) {
      setError("Error processing your file. Please try again.");
      console.error("Error uploading file:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emotion-recognition">
      <h2>Emotion Recognition (Image Input)</h2>
      <p>Upload an image of your face (large and centered).</p>
      <div className="example-image">
        <p>Example Image: </p>
        <img src="/emotionImages/Happy3.jpg" className="emotion-img"/>
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Analyzing..." : "Upload and Analyze"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <h3>Detected Emotion: {result.emotion}</h3>
          <img src={`data:image/jpeg;base64,${result.image}`} alt="Preprocessed" className="result-image" />
        </div>
      )}
    </div>
  );
};

export default EmotionRecognition;
