import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    accept: 'application/json'
  },
  timeout: 12000
})

export default api
