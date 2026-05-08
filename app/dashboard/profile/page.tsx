'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { api, type SessionView } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Monitor, Smartphone, Trash2 } from 'lucide-react'

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
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      {/* Account Info */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-xl font-medium">Account Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your account details</p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-mono text-sm text-muted-foreground">{user?.userId}</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant="secondary" className="mt-1 rounded-lg">{user?.role}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge 
                variant={user?.status === 'ACTIVE' ? 'default' : 'secondary'}
                className="mt-1 rounded-lg"
              >
                {user?.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-medium">Active Sessions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your devices
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full text-destructive hover:text-destructive"
            onClick={handleLogoutAll}
          >
            Sign Out All
          </Button>
        </div>
        
        <div className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              No active sessions found
            </p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  className="flex items-center justify-between rounded-xl border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                      {session.deviceId?.includes('mobile') ? (
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Monitor className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {session.deviceId?.slice(0, 8) || 'Unknown Device'}
                        </p>
                        {session.current && (
                          <Badge variant="secondary" className="rounded-lg text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last seen: {formatDate(session.lastSeenAt)}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl hover:bg-destructive/10"
                      onClick={() => handleRevokeSession(session.sessionId)}
                      disabled={revokingSession === session.sessionId}
                    >
                      {revokingSession === session.sessionId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
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
