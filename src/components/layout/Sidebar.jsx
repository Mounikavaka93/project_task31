import { NavLink, Link } from 'react-router-dom'
import { Home, Search, Library, Plus, Heart, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { playlists } from '../../data/musicData'
import { usePlayer } from '../../context/PlayerContext'

function Logo({ onNavigate }) {
  return (
    <Link to="/" className="flex items-center gap-2 px-2 py-1" onClick={onNavigate}>
      <motion.svg
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
        aria-hidden="true"
        whileHover={{ rotate: 12, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 16 }}
      >
        <circle cx="16" cy="16" r="16" fill="#1DB954" />
        <path d="M8.2 12.6c5.4-1.6 11.4-1 16.8 1.6" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8.8 16.5c4.6-1.3 9.7-0.8 14.3 1.4" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M9.4 20.2c3.8-1.1 8-0.7 11.7 1.1" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
      </motion.svg>
      <span className="hidden text-lg font-extrabold tracking-tight lg:inline">Spotify</span>
    </Link>
  )
}

const navClass = ({ isActive }) =>
  `relative flex items-center gap-4 rounded-md px-3 py-2.5 text-sm font-bold transition-colors ${
    isActive ? 'text-white' : 'text-muted hover:text-white'
  }`

function NavItem({ to, end, icon: Icon, label, onClick, layoutId }) {
  return (
    <NavLink to={to} end={end} className={navClass} onClick={onClick}>
      {({ isActive }) => (
        <>
          {isActive ? (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-md bg-white/10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          ) : null}
          <Icon className="relative z-10 h-6 w-6" />
          <span className="relative z-10 lg:inline md:hidden">{label}</span>
        </>
      )}
    </NavLink>
  )
}

function SidebarContent({ onNavigate, layoutId }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-surface px-4 py-4">
        <Logo onNavigate={onNavigate} />
        <button
          type="button"
          className="rounded-full p-1 text-muted hover:text-white md:hidden"
          onClick={onNavigate}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="bg-surface px-2 py-1">
        <NavItem to="/" end icon={Home} label="Home" onClick={onNavigate} layoutId={layoutId} />
        <NavItem to="/search" icon={Search} label="Search" onClick={onNavigate} layoutId={layoutId} />
        <NavItem to="/library" icon={Library} label="Your Library" onClick={onNavigate} layoutId={layoutId} />
      </nav>

      <div className="flex min-h-0 flex-1 flex-col bg-surface px-2 py-2">
        <div className="mb-3 hidden items-center justify-between px-2 lg:flex">
          <p className="text-sm font-bold text-muted">Playlists</p>
          <button type="button" className="text-muted hover:text-white" aria-label="Create playlist">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <NavLink to="/liked" onClick={onNavigate} className={navClass}>
          {({ isActive }) => (
            <>
              {isActive ? (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-md bg-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-br from-indigo-500 to-emerald-200">
                <Heart className="h-4 w-4 fill-white text-white" />
              </span>
              <span className="relative z-10 lg:inline md:hidden">Liked Songs</span>
            </>
          )}
        </NavLink>
        <div className="smooth-scroll mt-2 hidden min-h-0 flex-1 overflow-y-auto lg:block">
          {playlists.map((playlist) => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `block truncate rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? 'text-white' : 'text-muted hover:text-white'
                }`
              }
            >
              {playlist.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = usePlayer()
  const close = () => setSidebarOpen(false)

  return (
    <>
      <motion.aside
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="hidden h-full w-[72px] shrink-0 border-r border-white/5 bg-surface md:block lg:w-[260px]"
      >
        <SidebarContent onNavigate={close} layoutId="nav-pill-desktop" />
      </motion.aside>

      <AnimatePresence>
        {sidebarOpen ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Close sidebar"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="relative h-full w-[min(82vw,300px)] bg-surface shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <SidebarContent onNavigate={close} layoutId="nav-pill-mobile" />
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
