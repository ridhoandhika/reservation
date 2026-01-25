import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Laravel API
  timeout: 10000,
  withCredentials: true,
  headers: {
    "X-API-KEY": import.meta.env.VITE_X_API_KEY || "",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Interceptor (opsional)
api.interceptors.response.use(
  response => response,
  error => {
    // global error handler
    if (error.response?.status === 401) {
      console.warn('Unauthorized')
    }
    return Promise.reject(error)
  }
)

export default api
