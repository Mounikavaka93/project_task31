import { Repeat2, Shuffle, SkipBack, SkipForward, Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../../context/PlayerContext'
import { formatDuration } from '../../utils/format'
import CoverArt from '../ui/CoverArt'
import AudioBars from '../motion/AudioBars'
import LikeHeart from '../motion/LikeHeart'
import { springPop } from '../../motion/variants'

function Range({ value, max = 1, onChange, accent = '#1db954', className = '' }) {
  const percent = max ? Math.min(100, (value / max) * 100) : 0
  return (
    <input
      type="range"
      min="0"
      max={max}
      step="any"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className={`h-4 w-full cursor-pointer ${className}`}
      style={{
        background: `linear-gradient(to right, ${accent} 0%, ${accent} ${percent}%, #4d4d4d ${percent}%, #4d4d4d 100%)`,
        borderRadius: 99,
      }}
    />
  )
}

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    muted,
    shuffle,
    repeat,
    playPause,
    next,
    prev,
    seek,
    setVolume,
    setMuted,
    toggleShuffle,
    cycleRepeat,
    isLiked,
    toggleLike,
  } = usePlayer()

  const effectiveVolume = muted ? 0 : volume
  const remainingLabel = useMemo(() => formatDuration(duration), [duration])

  if (!currentSong) return null

  return (
    <motion.footer
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.12 }}
      className="relative z-40 h-[72px] w-full shrink-0 overflow-hidden border-t border-white/5 bg-[#181818] px-5 text-white md:h-[90px]"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        animate={{
          background: isPlaying
            ? [
                'linear-gradient(90deg, transparent, #1db954, transparent)',
                'linear-gradient(90deg, transparent, #1ed760, transparent)',
              ]
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }}
        transition={{ duration: 1.6, repeat: Infinity, repeatType: 'mirror' }}
      />
      {isPlaying ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-spotify/10 to-transparent"
          animate={{ x: ['-40%', '280%'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}
      <div className="relative grid h-full w-full grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[minmax(180px,1fr)_minmax(280px,2fr)_minmax(140px,1fr)]">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            className="relative shrink-0"
            animate={isPlaying ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={isPlaying ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          >
            {isPlaying ? (
              <span className="pointer-events-none absolute -inset-1 rounded-full bg-spotify/35 blur-md" />
            ) : null}
            <CoverArt
              src={currentSong.cover}
              title={currentSong.title}
              className="relative h-12 w-12 shadow-lg md:h-14 md:w-14"
              rounded="rounded-full"
              spinning={isPlaying}
            />
          </motion.div>
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSong.id}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <Link
                  to={currentSong.albumId ? `/album/${currentSong.albumId}` : '#'}
                  className="block truncate text-sm font-semibold hover:underline"
                >
                  {currentSong.title}
                </Link>
                {currentSong.artistId ? (
                  <Link to={`/artist/${currentSong.artistId}`} className="truncate text-xs text-muted hover:underline">
                    {currentSong.artist}
                  </Link>
                ) : (
                  <p className="truncate text-xs text-muted">{currentSong.artist}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <LikeHeart
            liked={isLiked(currentSong.id)}
            onToggle={() => toggleLike(currentSong.id)}
            className="hidden shrink-0 text-muted hover:text-white sm:inline-flex"
          />
        </div>

        <div className="flex flex-col items-end gap-1 md:items-center">
          <div className="flex items-center gap-3 md:gap-5">
            <motion.button
              type="button"
              aria-label="Shuffle"
              onClick={toggleShuffle}
              whileTap={{ scale: 0.85, rotate: 20 }}
              className={`hidden md:inline-flex ${shuffle ? 'text-spotify' : 'text-muted hover:text-white'}`}
            >
              <Shuffle className="h-4 w-4" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Previous"
              onClick={prev}
              whileTap={{ scale: 0.82, x: -3 }}
              className="text-muted hover:text-white"
            >
              <SkipBack className="h-5 w-5 fill-current" />
            </motion.button>
            <motion.button
              type="button"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={playPause}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              transition={springPop}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black md:h-10 md:w-10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isPlaying ? 'pause' : 'play'}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 fill-current md:h-5 md:w-5" />
                  ) : (
                    <Play className="h-4 w-4 translate-x-[1px] fill-current md:h-5 md:w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              type="button"
              aria-label="Next"
              onClick={next}
              whileTap={{ scale: 0.82, x: 3 }}
              className="text-muted hover:text-white"
            >
              <SkipForward className="h-5 w-5 fill-current" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Repeat"
              onClick={cycleRepeat}
              whileTap={{ scale: 0.85, rotate: -20 }}
              className={`relative hidden md:inline-flex ${repeat !== 'off' ? 'text-spotify' : 'text-muted hover:text-white'}`}
            >
              <Repeat2 className="h-4 w-4" />
              {repeat === 'one' ? (
                <span className="absolute -right-1.5 -bottom-1 text-[9px] font-bold">1</span>
              ) : null}
            </motion.button>
          </div>
          <div className="hidden w-full max-w-xl items-center gap-2 md:flex">
            <span className="w-10 text-right text-[11px] tabular-nums text-muted">{formatDuration(progress)}</span>
            <Range value={progress} max={duration || 1} onChange={seek} className="group" />
            <span className="w-10 text-[11px] tabular-nums text-muted">{remainingLabel}</span>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-3 md:flex">
          <AudioBars playing={isPlaying} bars={10} className="hidden lg:flex" />
          <motion.button
            type="button"
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={() => setMuted((value) => !value)}
            whileTap={{ scale: 0.85 }}
            className="text-muted hover:text-white"
          >
            {effectiveVolume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </motion.button>
          <Range
            value={effectiveVolume}
            max={1}
            accent="#fff"
            onChange={(value) => {
              setMuted(false)
              setVolume(value)
            }}
            className="w-24 lg:w-28"
          />
        </div>
      </div>
      <div className="absolute inset-x-5 top-0 md:hidden">
        <Range value={progress} max={duration || 1} onChange={seek} />
      </div>
    </motion.footer>
  )
}
