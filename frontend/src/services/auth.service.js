import { apiFetch, saveAuthSession } from './api'

export async function loginRequest({ email, password, remember }) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  saveAuthSession(data, remember)
  return data?.access_token
}

export async function registerRequest({ email, password, remember = true }) {
  const cleanEmail = String(email || '').trim().toLowerCase()

  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: cleanEmail,
      password,
    }),
  })

  saveAuthSession(data, remember)
  return data
}
