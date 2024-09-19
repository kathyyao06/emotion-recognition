// src/pages/HomePage.js
import React from "react";
import './HomePage.css';

const emotions = [
  {
    name: "Emotion: Happy",
    images: [
      "/emotionImages/Happy1.jpg",
      "/emotionImages/Happy2.jpg",
      "/emotionImages/Happy3.jpg",
      "/emotionImages/Happy4.jpg",
      "/emotionImages/Happy5.jpg",
    ],
  },
  {
    name: "Emotion: Sad",
    images: [
      "/emotionImages/Sad1.jpg",
      "/emotionImages/Sad2.jpg",
      "/emotionImages/Sad3.jpg",
      "/emotionImages/Sad4.jpg",
      "/emotionImages/Sad5.jpg",
    ],
  },
  {
    name: "Emotion: Angry",
    images: [
      "/emotionImages/Angry1.jpg",
      "/emotionImages/Angry2.jpg",
      "/emotionImages/Angry3.jpg",
      "/emotionImages/Angry4.jpg",
      "/emotionImages/Angry5.jpg",
    ],
  },
  {
    name: "Emotion: Surprise",
    images: [
      "/emotionImages/Surprise1.jpg",
      "/emotionImages/Surprise2.jpg",
      "/emotionImages/Surprise3.jpg",
      "/emotionImages/Surprise4.jpg",
      "/emotionImages/Surprise5.jpg",
    ],
  },
  {
    name: "Emotion: Neutral",
    images: [
      "/emotionImages/Neutral1.jpg",
      "/emotionImages/Neutral2.jpg",
      "/emotionImages/Neutral3.jpg",
      "/emotionImages/Neutral4.jpg",
      "/emotionImages/Neutral5.jpg",
    ],
  },
  {
    name: "Emotion: Fear",
    images: [
      "/emotionImages/Fear1.jpg",
      "/emotionImages/Fear2.jpg",
      "/emotionImages/Fear3.jpg",
      "/emotionImages/Fear4.jpg",
      "/emotionImages/Fear5.jpg",
    ],
  },
  {
    name: "Emotion: Disgust",
    images: [
      "/emotionImages/Disgust1.jpg",
      "/emotionImages/Disgust2.jpg",
      "/emotionImages/Disgust3.jpg",
      "/emotionImages/Disgust4.jpg",
      "/emotionImages/Disgust5.jpg",
    ],
  },
];

const HomePage = () => {
  return (
    <div className="home">
      <h2>Introduction</h2>
      <p>This is a web application utilizing deep convolutional neural networks to classify a person’s emotion into one of seven categories: Happy, Sad, Angry, Surprise, Neutral, Fear, and Disgust. Taking image or video inputs, it aims to classify your emotion. The model is trained on Fer2013, which contains 30000 facial RGB images of different expressions.</p>

      <h2> Example Image Classification From Fer2013 Dataset</h2>
      {emotions.map((emotion) => (
        <div key={emotion.name} className="emotion-section">
          <h2>{emotion.name}</h2>
          <div className="emotion-images">
            {emotion.images.map((image, index) => (
              <img key={index} src={image} alt={`${emotion.name} ${index + 1}`} className="emotion-img" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
