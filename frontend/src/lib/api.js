import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'
export function getApi() {
  const api = axios.create({ baseURL: API_BASE })
  const token = localStorage.getItem('token')
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return api
}
export const API_BASE_URL = API_BASE
