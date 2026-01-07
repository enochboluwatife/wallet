import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZGVqaTpIanVqYQ==' // Basic auth for dev (deji:password) in base64. Note: In real app use JWT/Token.
    }
});

// Since we are mocking auth for prototype, we'll hardcode the basic auth header or login flow.
// For this prototype, I'll update the interceptor to add auth if we implement login.
// For now, let's assume we use the mock user.

export default api;
