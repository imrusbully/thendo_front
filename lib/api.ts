const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresInSec: number
}

interface OtpCreateResponse {
  otpId: string
  expiresInSec: number
}

interface MeResponse {
  userId: string
  sessionId: string
  email: string
  role: 'USER' | 'ADMIN'
  status: 'ACTIVE' | 'INACTIVE'
}

interface PaymentsMeResponse {
  plan: 'FREE' | 'PREMIUM'
  status: 'CREATED' | 'PROVIDER_CREATED' | 'COMPLETED' | 'FAILED' | 'EXPIRED'
  currentPeriodEnd: string
  entitlements: {
    premium: boolean
    monthlyCredits: number
  }
  creditBalance: {
    balance: number
  }
}

interface SessionView {
  sessionId: string
  current: boolean
  createdAt: string
  lastSeenAt: string
  deviceId: string
}

interface CheckoutResponse {
  attemptId: string
  checkoutUrl: string
}

class ApiClient {
  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refreshToken')
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('deviceId')
  }

  private getDeviceId(): string {
    let deviceId = localStorage.getItem('deviceId')
    if (!deviceId) {
      deviceId = crypto.randomUUID()
      localStorage.setItem('deviceId', deviceId)
    }
    return deviceId
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retry = true
  ): Promise<T> {
    const accessToken = this.getAccessToken()
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (response.status === 401 && retry) {
      const refreshed = await this.refreshTokens()
      if (refreshed) {
        return this.request<T>(endpoint, options, false)
      }
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `Request failed with status ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  private async refreshTokens(): Promise<boolean> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return false

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/public/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) return false

      const data: AuthResponse = await response.json()
      this.setTokens(data.accessToken, data.refreshToken)
      return true
    } catch {
      return false
    }
  }

  // Auth
  async createOtp(email: string): Promise<OtpCreateResponse> {
    return this.request<OtpCreateResponse>('/api/v1/auth/public/otp/create', {
      method: 'POST',
      body: JSON.stringify({
        channel: 'EMAIL',
        identifier: email,
      }),
    })
  }

  async verifyOtp(otpId: string, otpCode: string): Promise<AuthResponse> {
    const deviceId = this.getDeviceId()
    const response = await this.request<AuthResponse>('/api/v1/auth/public/otp/verify', {
      method: 'POST',
      body: JSON.stringify({
        otpId,
        otpCode,
        device: { deviceId },
      }),
    })
    this.setTokens(response.accessToken, response.refreshToken)
    return response
  }

  async logout(): Promise<void> {
    await this.request<void>('/api/v1/auth/logout', { method: 'POST' })
    this.clearTokens()
  }

  async logoutAll(): Promise<void> {
    await this.request<void>('/api/v1/auth/logout/all', { method: 'POST' })
    this.clearTokens()
  }

  // User
  async getMe(): Promise<MeResponse> {
    return this.request<MeResponse>('/api/v1/me')
  }

  async getPaymentsMe(): Promise<PaymentsMeResponse> {
    return this.request<PaymentsMeResponse>('/api/v1/payments/me')
  }

  async getSessions(): Promise<SessionView[]> {
    return this.request<SessionView[]>('/api/v1/auth/sessions/getList')
  }

  async revokeSession(sessionId: string): Promise<void> {
    return this.request<void>(`/api/v1/auth/sessions/${sessionId}`, {
      method: 'DELETE',
    })
  }

  // Payments
  async checkout(): Promise<CheckoutResponse> {
    return this.request<CheckoutResponse>('/api/v1/payments/stripe/checkout', {
      method: 'POST',
    })
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}

export const api = new ApiClient()

export type { 
  AuthResponse, 
  OtpCreateResponse, 
  MeResponse, 
  PaymentsMeResponse, 
  SessionView,
  CheckoutResponse 
}
