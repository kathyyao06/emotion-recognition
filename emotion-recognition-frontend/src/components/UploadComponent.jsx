// src/components/UploadComponent.jsx
import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const UploadComponent = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/analyze/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to analyze the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        accept="image/*,video/*"
        style={{ display: 'none' }}
        id="upload-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-file">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      {file && <span style={{ marginLeft: '10px' }}>{file.name}</span>}
      <br /><br />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Analyze Emotion'}
      </Button>
    </div>
  );
};

export default UploadComponent;
