// src/config/api.js

// Change this based on environment
const isProd = true;

export const API_URL = isProd 
  ? 'https://backend-home-zayka.vercel.app/api' 
  : 'http://localhost:8080/api';
