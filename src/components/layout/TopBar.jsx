import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, ChevronLeft, ChevronRight, Menu, Search } from 'lucide-react'
import { usePlayer } from '../../context/PlayerContext'
import { useAuth } from '../../context/AuthContext'
import { notifications as seedNotifications } from '../../data/accountData'

export default function TopBar() {
  const { setSidebarOpen, setIsPlaying } = usePlayer()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const urlQuery = params.get('q') || ''
  const [query, setQuery] = useState(urlQuery)
  const [menu, setMenu] = useState(null)
  const [notes, setNotes] = useState(seedNotifications)
  const inputRef = useRef(null)
  const clusterRef = useRef(null)
  const unread = notes.some((item) => item.unread)

  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    if (location.pathname === '/search') {
      inputRef.current?.focus()
    }
  }, [location.pathname])

  useEffect(() => {
    setMenu(null)
  }, [location.pathname])

  useEffect(() => {
    const onPointer = (event) => {
      if (!clusterRef.current?.contains(event.target)) setMenu(null)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setMenu(null)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const submitSearch = (value) => {
    setQuery(value)
    navigate(value.trim() ? `/search?q=${encodeURIComponent(value)}` : '/search')
  }

  const openBell = () => {
    setMenu((current) => (current === 'bell' ? null : 'bell'))
    setNotes((items) => items.map((item) => ({ ...item, unread: false })))
  }

  const openProfile = () => {
    setMenu((current) => (current === 'profile' ? null : 'profile'))
  }

  const signOut = () => {
    setMenu(null)
    setIsPlaying(false)
    logout()
    navigate('/login')
  }

  return (
    <header className="relative z-30 flex items-center gap-3 bg-surface/80 px-5 py-3 backdrop-blur-md">
      <button
        type="button"
        className="shrink-0 rounded-full bg-black/60 p-2 text-white md:hidden"
        aria-label="Open menu"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden shrink-0 items-center gap-2 md:flex">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="rounded-full bg-black/70 p-1.5 text-white hover:bg-black"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Go forward"
          onClick={() => navigate(1)}
          className="rounded-full bg-black/70 p-1.5 text-white hover:bg-black"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mx-auto min-w-0 w-full max-w-xl">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => submitSearch(event.target.value)}
          onFocus={() => {
            if (location.pathname !== '/search') navigate('/search')
          }}
          placeholder="What do you want to play?"
          className="h-11 w-full rounded-full bg-[#242424] pr-4 pl-11 text-sm text-white outline-none ring-0 transition placeholder:text-muted hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:ring-2 focus:ring-white"
        />
      </div>

      <div ref={clusterRef} className="relative flex shrink-0 items-center gap-2">
        <Link
          to="/premium"
          className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black transition hover:scale-105 sm:px-4 sm:text-sm"
        >
          <span className="sm:hidden">Premium</span>
          <span className="hidden sm:inline">Explore Premium</span>
        </Link>
        <button
          type="button"
          className="relative rounded-full bg-black/70 p-2 text-muted hover:text-white"
          aria-label="Notifications"
          aria-expanded={menu === 'bell'}
          onClick={openBell}
        >
          <Bell className="h-5 w-5" />
          {unread ? <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500" /> : null}
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold hover:ring-2 hover:ring-white"
          aria-label="Account"
          aria-expanded={menu === 'profile'}
          onClick={openProfile}
        >
          <span className="text-xs font-bold">
            {user?.name
              ?.split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </span>
        </button>

        <AnimatePresence>
          {menu === 'bell' ? (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute top-[calc(100%+10px)] right-0 z-50 w-[min(92vw,360px)] overflow-hidden rounded-lg bg-[#282828] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="font-bold">What’s New</p>
                <span className="text-xs text-muted">{notes.length} updates</span>
              </div>
              <ul className="smooth-scroll max-h-[min(70vh,420px)] overflow-y-auto">
                {notes.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col gap-0.5 px-4 py-3 text-left hover:bg-white/8"
                      onClick={() => {
                        setMenu(null)
                        navigate(item.to)
                      }}
                    >
                      <span className="text-sm font-bold">{item.title}</span>
                      <span className="text-sm text-muted">{item.body}</span>
                      <span className="text-xs text-muted">{item.time}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}

          {menu === 'profile' ? (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute top-[calc(100%+10px)] right-0 z-50 w-56 overflow-hidden rounded-lg bg-[#282828] py-1 shadow-2xl"
            >
              <p className="px-3 py-2 text-xs text-muted">
                {user?.name} · {user?.plan}
              </p>
              <Link to="/profile" className="block px-3 py-2.5 text-sm hover:bg-white/10" onClick={() => setMenu(null)}>
                Profile
              </Link>
              <Link to="/settings" className="block px-3 py-2.5 text-sm hover:bg-white/10" onClick={() => setMenu(null)}>
                Settings
              </Link>
              <Link to="/premium" className="block px-3 py-2.5 text-sm hover:bg-white/10" onClick={() => setMenu(null)}>
                Upgrade to Premium
              </Link>
              <button
                type="button"
                className="block w-full px-3 py-2.5 text-left text-sm hover:bg-white/10"
                onClick={signOut}
              >
                Log out
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
