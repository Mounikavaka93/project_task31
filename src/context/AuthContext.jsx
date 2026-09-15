import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'spotify-session'
const USERS_KEY = 'spotify-users'

export const demoAccount = {
  name: 'Mounika Vaka',
  email: 'mounika.vaka@gmail.com',
  password: 'Mounika@123',
  handle: 'mounikavaka',
  plan: 'Free',
  followers: 128,
  following: 64,
  playlists: 8,
}

const defaultUser = {
  name: demoAccount.name,
  email: demoAccount.email,
  handle: demoAccount.handle,
  plan: demoAccount.plan,
  followers: demoAccount.followers,
  following: demoAccount.following,
  playlists: demoAccount.playlists,
}

function readUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { isLoggedIn: true, user: defaultUser }
    const parsed = JSON.parse(raw)
    if (parsed?.loggedOut) return { isLoggedIn: false, user: null }
    if (parsed?.user) return { isLoggedIn: true, user: parsed.user }
    return { isLoggedIn: true, user: defaultUser }
  } catch {
    return { isLoggedIn: true, user: defaultUser }
  }
}

function publicUser(account) {
  return {
    name: account.name,
    email: account.email,
    handle: account.handle,
    plan: account.plan,
    followers: account.followers,
    following: account.following,
    playlists: account.playlists,
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const initial = readSession()
  const [user, setUser] = useState(initial.user)
  const [isLoggedIn, setIsLoggedIn] = useState(initial.isLoggedIn)

  const login = (email, password) => {
    const normalized = email.trim().toLowerCase()
    if (normalized === demoAccount.email && password === demoAccount.password) {
      const next = publicUser(demoAccount)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: next }))
      setUser(next)
      setIsLoggedIn(true)
      return { ok: true }
    }

    const match = readUsers().find((item) => item.email.toLowerCase() === normalized && item.password === password)
    if (!match) {
      return { ok: false, message: 'Email or password is incorrect.' }
    }

    const next = publicUser(match)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: next }))
    setUser(next)
    setIsLoggedIn(true)
    return { ok: true }
  }

  const signup = (account) => {
    const email = account.email.trim().toLowerCase()
    const users = readUsers()
    if (email === demoAccount.email || users.some((item) => item.email.toLowerCase() === email)) {
      return { ok: false, message: 'An account with this email already exists.' }
    }

    const created = {
      name: account.name.trim(),
      email,
      password: account.password,
      handle: account.name.trim().toLowerCase().replace(/\s+/g, ''),
      plan: 'Free',
      followers: 0,
      following: 0,
      playlists: 0,
    }
    saveUsers([...users, created])
    const next = publicUser(created)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: next }))
    setUser(next)
    setIsLoggedIn(true)
    return { ok: true }
  }

  const logout = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ loggedOut: true }))
    setUser(null)
    setIsLoggedIn(false)
  }

  const value = useMemo(
    () => ({ user, isLoggedIn, login, signup, logout }),
    [user, isLoggedIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
