import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import PlayButton from '../ui/PlayButton'
import CoverArt from '../ui/CoverArt'
import { usePlayer } from '../../context/PlayerContext'

export default function MixCard({ to, title, subtitle, color, images = [], song, queue }) {
  const { currentSong, isPlaying } = usePlayer()
  const reduce = useReducedMotion()
  const active = song && currentSong?.id === song.id && isPlaying

  return (
    <Link to={to} className="group block">
      <div className="relative mb-3 aspect-square overflow-hidden rounded shadow-lg" style={{ background: color }}>
        <p className="absolute top-3 left-3 z-10 max-w-[70%] text-lg font-black leading-tight">{title}</p>
        <motion.div
          className="absolute right-[-12%] bottom-[-8%] flex -rotate-[20deg] gap-2"
          animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-20, -14, -20] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {images.slice(0, 2).map((image, index) => (
            <motion.div
              key={image}
              animate={reduce ? undefined : { y: [0, index ? 8 : -6, 0] }}
              transition={{ duration: 4.2 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CoverArt
                src={image}
                title={title}
                className="h-24 w-24 shadow-2xl sm:h-28 sm:w-28"
                rounded="rounded-sm"
              />
            </motion.div>
          ))}
        </motion.div>
        <div
          className={`absolute right-2 bottom-2 z-20 transition ${
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {song ? <PlayButton song={song} queue={queue} size="md" pulse /> : null}
        </div>
      </div>
      <h3 className="truncate font-bold">{title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{subtitle}</p>
    </Link>
  )
}
