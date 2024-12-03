// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmotionRecognitionImage from './pages/EmotionRecognitionImage'
import EmotionRecognitionVideo from './pages/EmotionRecognitionVideo'
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      { <NavBar /> }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/EmotionRecognitionImage" element={<EmotionRecognitionImage />} />
        <Route path="/EmotionRecognitionVideo" element={<EmotionRecognitionVideo />} />
      </Routes>
    </Router>
  );
};

export default App;