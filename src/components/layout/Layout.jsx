import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MusicPlayer from '../player/MusicPlayer'
import PageTransition from '../motion/PageTransition'
import Spotlight, { useSpotlight } from '../motion/Spotlight'

export default function Layout() {
  const location = useLocation()
  const { x, y, onMouseMove } = useSpotlight()

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black text-white">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-surface" onMouseMove={onMouseMove}>
          <Spotlight x={x} y={y} />
          <motion.div
            key={location.pathname}
            className="pointer-events-none absolute top-0 left-0 z-40 h-[2px] origin-left bg-spotify"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: [1, 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.7, 1], ease: [0.22, 1, 0.36, 1] }}
          />
          <TopBar />
          <div className="relative z-10 smooth-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <PageTransition routeKey={location.pathname}>
              <Outlet />
            </PageTransition>
          </div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}
