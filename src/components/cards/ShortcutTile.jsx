import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import CoverArt from '../ui/CoverArt'
import PlayButton from '../ui/PlayButton'
import { usePlayer } from '../../context/PlayerContext'

export default function ShortcutTile({ item, queue }) {
  const { playAt } = usePlayer()
  const song = item.song
  const tracks = item.queue || queue || (song ? [song] : [])

  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="group relative flex h-14 overflow-hidden rounded bg-white/10 md:h-16"
    >
      <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-shine" />
      <button
        type="button"
        className="shrink-0"
        onClick={() => song && playAt(song, tracks)}
        aria-label={`Play ${item.title}`}
      >
        <CoverArt
          src={item.image}
          title={item.title}
          className="h-14 w-14 md:h-16 md:w-16"
          rounded="rounded-none"
        />
      </button>
      <Link to={item.to} className="flex min-w-0 flex-1 items-center px-3 text-sm font-bold hover:underline">
        <span className="truncate">{item.title}</span>
      </Link>
      <div className="relative z-20 flex items-center pr-2 opacity-0 transition group-hover:opacity-100">
        {song ? <PlayButton song={song} queue={tracks} size="sm" /> : null}
      </div>
    </motion.div>
  )
}
