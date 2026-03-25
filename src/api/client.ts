import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('dv_tokens')
    if (raw) {
      const tokens = JSON.parse(raw) as { accessToken: string }
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }
  } catch {
    // no-op
  }
  return config
})

// On 401, clear session and redirect to login
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('dv_tokens')
      localStorage.removeItem('dv_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
