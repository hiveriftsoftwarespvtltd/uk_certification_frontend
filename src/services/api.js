import axios from 'axios'
import { API_BASE_URL } from '../config'

// Axios Instance with global base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
})

// Attach JWT token if present in localStorage
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('uk_admin_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // ignore
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const api = {
  client: apiClient,

  // 1. Auth API
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      const data = response.data
      if (data?.accessToken) {
        localStorage.setItem('uk_admin_token', data.accessToken)
      }
      return data
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Authentication failed'
      throw new Error(message)
    }
  },

  logout() {
    try {
      localStorage.removeItem('uk_admin_token')
    } catch {
      // ignore
    }
  },

  // 2. Certificates API
  async getCertificates(query = '') {
    try {
      const url = query
        ? `/certificates?q=${encodeURIComponent(query)}`
        : '/certificates'
      const response = await apiClient.get(url)
      return response.data
    } catch (err) {
      console.warn('API getCertificates error, using local fallback:', err.message)
      return null
    }
  },

  async verifyCertificate(certNo) {
    try {
      const response = await apiClient.get(
        `/certificates/verify/${encodeURIComponent(certNo)}`
      )
      return response.data
    } catch (err) {
      console.warn('API verifyCertificate error, using local fallback:', err.message)
      return null
    }
  },

  async createCertificate(certData) {
    try {
      const response = await apiClient.post('/certificates', certData)
      return response.data
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Failed to register certificate'
      throw new Error(message)
    }
  },

  async deleteCertificate(certNo) {
    try {
      const response = await apiClient.delete(
        `/certificates/${encodeURIComponent(certNo)}`
      )
      return response.data
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Failed to delete certificate'
      throw new Error(message)
    }
  },

  // 3. Contact Inquiries
  async submitContact(inquiryData) {
    try {
      const response = await apiClient.post('/contact', inquiryData)
      return response.data
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Failed to submit inquiry'
      throw new Error(message)
    }
  },

  async getContacts() {
    try {
      const response = await apiClient.get('/contact')
      return response.data
    } catch (err) {
      console.warn('API getContacts error:', err.message)
      return []
    }
  }
}

export default api
