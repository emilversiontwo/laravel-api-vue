import { request } from './client'

export interface User {
  id: string
  name: string
  email: string
}

interface AuthResponse {
  user: User
  token: string
}

export const login = (email: string, password: string) =>
  request<AuthResponse>('/login', { method: 'POST', body: JSON.stringify({ email, password }) })

export const register = (name: string, email: string, password: string, password_confirmation: string) =>
  request<AuthResponse>('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, password_confirmation }),
  })

export const logout = () => request<void>('/logout', { method: 'POST' })

export const fetchMe = () => request<User>('/me')
