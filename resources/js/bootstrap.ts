import axios from 'axios';
window.axios = axios;

const token = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content')

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['X-API-KEY'] = import.meta.env.VITE_X_API_KEY || ''
axios.defaults.withCredentials = true
