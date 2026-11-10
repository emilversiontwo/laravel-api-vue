import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import * as authApi from '../api/auth'
import { clearToken, getToken, setToken } from '../api/client'

interface AuthContextValue {
  user: authApi.User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, confirmation: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<authApi.User | null>(null)
  const [loading, setLoading] = useState(!!getToken())

  useEffect(() => {
    if (!getToken()) return
    authApi
      .fetchMe()
      .then(setUser)
      .catch(clearToken)
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await authApi.login(email, password)
    setToken(token)
    setUser(user)
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string, confirmation: string) => {
      const { user, token } = await authApi.register(name, email, password, confirmation)
      setToken(token)
      setUser(user)
    },
    [],
  )

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => undefined)
    clearToken()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
