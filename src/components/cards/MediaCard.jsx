import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import PlayButton from '../ui/PlayButton'
import CoverArt from '../ui/CoverArt'
import { usePlayer } from '../../context/PlayerContext'

export default function MediaCard({
  to,
  image,
  title,
  subtitle,
  song,
  queue,
  rounded = 'lg',
}) {
  const { currentSong, isPlaying } = usePlayer()
  const active = song && currentSong?.id === song.id && isPlaying
  const radius = rounded === 'full' ? 999 : 8
  const cardRef = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 220, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 220, damping: 18 })
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(380px circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 40%)`

  const onMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }

  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group relative flex flex-col rounded-lg bg-elevated p-3 will-change-transform hover:bg-highlight"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
      <div className="relative mb-3 overflow-hidden shadow-lg shadow-black/40 transition duration-500 group-hover:scale-105" style={{ borderRadius: radius }}>
        <Link to={to} tabIndex={-1}>
          <CoverArt
            src={image}
            title={title}
            className="aspect-square w-full"
            rounded="rounded-none"
          />
        </Link>
        <div
          className={`absolute right-2 bottom-2 z-20 transition duration-300 ${
            active
              ? 'translate-y-0 opacity-100'
              : 'opacity-100 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100'
          }`}
        >
          {song ? <PlayButton song={song} queue={queue} size="md" pulse /> : null}
        </div>
      </div>
      <Link to={to} className="relative min-w-0">
        <h3 className="truncate font-bold hover:underline">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{subtitle}</p>
      </Link>
    </motion.div>
  )
}
