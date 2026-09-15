import { Play, Pause } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePlayer } from '../../context/PlayerContext'
import { springPop } from '../../motion/variants'
import Magnetic from '../motion/Magnetic'

export default function PlayButton({
  song,
  queue,
  size = 'md',
  className = '',
  pulse = false,
}) {
  const { currentSong, isPlaying, playAt, playPause } = usePlayer()
  const active = currentSong?.id === song?.id
  const playingHere = active && isPlaying

  const sizes = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
  }

  const onClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!song) return
    if (active) playPause()
    else playAt(song, queue)
  }

  return (
    <Magnetic>
      <motion.button
        type="button"
        aria-label={playingHere ? 'Pause' : 'Play'}
        onClick={onClick}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        transition={springPop}
        className={`${sizes[size]} ${pulse && playingHere ? 'play-pulse' : ''} inline-flex items-center justify-center rounded-full bg-spotify text-black shadow-lg shadow-black/40 hover:bg-spotify-hover ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={playingHere ? 'pause' : 'play'}
            initial={{ scale: 0.4, opacity: 0, rotate: -50 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0, rotate: 50 }}
            transition={{ duration: 0.2 }}
            className="flex h-full w-full items-center justify-center"
          >
            {playingHere ? (
              <Pause className="h-[46%] w-[46%] fill-current" />
            ) : (
              <Play className="h-[46%] w-[46%] fill-current translate-x-[1px]" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </Magnetic>
  )
}
