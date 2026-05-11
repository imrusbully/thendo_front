'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { api, type SessionView } from '@/lib/api'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [sessions, setSessions] = useState<SessionView[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [revokingSession, setRevokingSession] = useState<string | null>(null)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      const data = await api.getSessions()
      setSessions(data)
    } catch (error) {
      console.error('Failed to load sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeSession = async (sessionId: string) => {
    setRevokingSession(sessionId)
    try {
      await api.revokeSession(sessionId)
      setSessions(sessions.filter((s) => s.sessionId !== sessionId))
    } catch (error) {
      console.error('Failed to revoke session:', error)
    } finally {
      setRevokingSession(null)
    }
  }

  const handleLogoutAll = async () => {
    try {
      await api.logoutAll()
      logout()
    } catch (error) {
      console.error('Failed to logout all:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account settings</p>
      </div>

      {/* Account Info */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground">Account Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your account details</p>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="text-xs font-mono text-muted-foreground">{user?.userId}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded">
                {user?.role}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                user?.status === 'ACTIVE' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
              }`}>
                {user?.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Active Sessions</h2>
            <p className="mt-1 text-sm text-muted-foreground">Manage your devices</p>
          </div>
          <button
            onClick={handleLogoutAll}
            className="px-3 py-1.5 text-xs font-medium text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors"
          >
            Sign out all
          </button>
        </div>
        
        <div className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="w-6 h-6 animate-spin text-muted-foreground" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : sessions.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No active sessions found
            </p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      {session.deviceId?.includes('mobile') ? (
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {session.deviceId?.slice(0, 8) || 'Unknown Device'}
                        </p>
                        {session.current && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last seen: {formatDate(session.lastSeenAt)}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => handleRevokeSession(session.sessionId)}
                      disabled={revokingSession === session.sessionId}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                    >
                      {revokingSession === session.sessionId ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
