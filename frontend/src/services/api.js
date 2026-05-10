const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

export function getAuthToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || ''
}

export function saveAuthToken(token, remember = true) {
  if (!token) return
  // Toujours utiliser localStorage pour s'assurer que c'est bien stocké
  localStorage.setItem('token', token)
}

export function saveAuthSession(data, remember = true) {
  if (!data?.access_token) return

  saveAuthToken(data.access_token, remember)
  if (data.user) {
    localStorage.setItem('madagiascar.user', JSON.stringify(data.user))
    localStorage.setItem('madagiascar.session_id', data.user.id)
  }
}

export function clearAuthSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('madagiascar.user')
  localStorage.removeItem('madagiascar.session_id')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('madagiascar.user')
  sessionStorage.removeItem('madagiascar.session_id')
}

export function getAuthUser() {
  try {
    return JSON.parse(
      localStorage.getItem('madagiascar.user') || sessionStorage.getItem('madagiascar.user') || 'null'
    )
  } catch {
    return null
  }
}

export async function readJsonSafely(response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

export async function apiFetch(path, options = {}) {
  const token = getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await readJsonSafely(response)

  if (!response.ok || data?.error) {
    throw new Error(data?.message || 'Erreur API')
  }

  return data
}
