// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmotionRecognition from './pages/EmotionRecognition'
import styled from 'styled-components';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      { <NavBar /> }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/EmotionRecognition" element={<EmotionRecognition />} />
      </Routes>
    </Router>
  );
};

export default App;