'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { api, type MeResponse, type PaymentsMeResponse } from './api'

interface AuthContextType {
  user: MeResponse | null
  subscription: PaymentsMeResponse | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (accessToken: string, refreshToken: string) => void
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null)
  const [subscription, setSubscription] = useState<PaymentsMeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const [userData, subData] = await Promise.all([
        api.getMe(),
        api.getPaymentsMe(),
      ])
      setUser(userData)
      setSubscription(subData)
    } catch {
      setUser(null)
      setSubscription(null)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      if (api.isAuthenticated()) {
        await refreshUser()
      }
      setIsLoading(false)
    }
    init()
  }, [refreshUser])

  const login = useCallback((accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    refreshUser()
  }, [refreshUser])

  const logout = useCallback(async () => {
    try {
      await api.logout()
    } catch {
      // Clear tokens even if logout fails
    }
    api.clearTokens()
    setUser(null)
    setSubscription(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
