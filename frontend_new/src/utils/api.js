import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem('userToken');
        window.location.href = '/login';
      } else if (status >= 500) {
        console.error('Server error:', data.message || 'Internal server error');
      }
    } else if (error.request) {
      console.error('Network error:', error.message);
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
export { API_BASE_URL };