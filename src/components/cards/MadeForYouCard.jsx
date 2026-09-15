import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import PlayButton from '../ui/PlayButton'
import CoverArt from '../ui/CoverArt'
import { usePlayer } from '../../context/PlayerContext'

const NOTES = ['♪', '♫', '♩', '♬']

function Waveform({ active, hovered }) {
  const amp = active ? 14 : hovered ? 11 : 7
  return (
    <svg viewBox="0 0 200 48" className="absolute inset-x-0 bottom-0 h-16 w-full opacity-80" aria-hidden="true">
      {[0, 1, 2].map((layer) => (
        <motion.path
          key={layer}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={layer === 1 ? 2.2 : 1.2}
          animate={{
            d: [
              `M0 24 Q 25 ${24 - amp} 50 24 T 100 24 T 150 24 T 200 24`,
              `M0 24 Q 25 ${24 + amp} 50 24 T 100 24 T 150 24 T 200 24`,
              `M0 24 Q 25 ${24 - amp} 50 24 T 100 24 T 150 24 T 200 24`,
            ],
          }}
          transition={{ duration: 1.1 + layer * 0.25, repeat: Infinity, ease: 'easeInOut', delay: layer * 0.12 }}
        />
      ))}
    </svg>
  )
}

function EqualizerField({ active, hovered }) {
  const bars = [18, 40, 26, 52, 22, 46, 30, 58, 20, 44, 28, 50, 24, 38, 16]
  return (
    <div className="absolute inset-x-2 bottom-2 flex h-16 items-end justify-between gap-[3px]" aria-hidden="true">
      {bars.map((peak, index) => (
        <motion.span
          key={index}
          className="w-full rounded-full bg-white/70 origin-bottom"
          animate={{
            height: active || hovered ? [8, peak, 12, peak * 0.65, 10] : [6, peak * 0.35, 8],
          }}
          transition={{
            duration: 0.45 + (index % 4) * 0.08,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: index * 0.04,
          }}
        />
      ))}
    </div>
  )
}

function VinylDisc({ image, title, spinning, fast }) {
  return (
    <div className="absolute -right-6 -bottom-8 h-[78%] w-[78%]" aria-hidden="true">
      <motion.div
        className="relative h-full w-full rounded-full bg-[#0b0b0b] shadow-2xl"
        animate={{ rotate: spinning ? 360 : 0 }}
        transition={spinning ? { duration: fast ? 3.1 : 7.5, repeat: Infinity, ease: 'linear' } : { duration: 0.8 }}
      >
        {[88, 76, 64, 52].map((size) => (
          <span
            key={size}
            className="absolute rounded-full border border-white/10"
            style={{ inset: `${(100 - size) / 2}%` }}
          />
        ))}
        <div className="absolute inset-[31%] overflow-hidden rounded-full ring-2 ring-black/50">
          <CoverArt src={image} title={title} className="h-full w-full" rounded="rounded-full" />
        </div>
        <span className="absolute inset-[47%] rounded-full bg-black" />
      </motion.div>
    </div>
  )
}

function Cassette({ spinning }) {
  return (
    <div className="absolute right-2 bottom-3 flex h-[42%] w-[58%] items-center justify-center rounded-md bg-black/35 ring-1 ring-white/15" aria-hidden="true">
      <div className="flex w-[78%] items-center justify-between">
        {[0, 1].map((reel) => (
          <motion.span
            key={reel}
            className="relative h-9 w-9 rounded-full border-[3px] border-white/70"
            animate={{ rotate: spinning ? 360 : 0 }}
            transition={spinning ? { duration: 2.4 + reel, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}
          >
            <span className="absolute inset-[30%] rounded-full bg-white/80" />
            <span className="absolute top-1/2 left-0 h-px w-full bg-white/50" />
            <span className="absolute top-0 left-1/2 h-full w-px bg-white/50" />
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function SpeakerRipples({ active }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="absolute top-1/2 left-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35"
          animate={{
            scale: active ? [1, 4.2] : [1, 2.6],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: active ? 1.6 : 2.4,
            repeat: Infinity,
            delay: index * 0.45,
            ease: 'easeOut',
          }}
        />
      ))}
      <motion.span
        className="absolute top-1/2 left-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 ring-2 ring-white/40"
        animate={{ scale: active ? [1, 1.12, 1] : [1, 1.04, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function StaffNotes({ active }) {
  const notes = [
    { y: '38%', delay: 0 },
    { y: '52%', delay: 0.4 },
    { y: '28%', delay: 0.8 },
    { y: '60%', delay: 1.1 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {[32, 44, 56, 68, 80].map((top) => (
        <span key={top} className="absolute right-0 left-0 border-t border-white/20" style={{ top: `${top}%` }} />
      ))}
      {notes.map((note, index) => (
        <motion.span
          key={index}
          className="absolute text-xl text-white/85"
          style={{ top: note.y }}
          animate={{ x: ['110%', '-40%'], y: active ? [0, -6, 0] : 0 }}
          transition={{ duration: active ? 4.2 : 6.5, repeat: Infinity, ease: 'linear', delay: note.delay }}
        >
          {NOTES[index % NOTES.length]}
        </motion.span>
      ))}
    </div>
  )
}

function FloatingNotes({ active }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {NOTES.map((note, index) => (
        <motion.span
          key={note + index}
          className="absolute text-lg text-white/80"
          style={{ left: `${12 + index * 18}%`, bottom: '18%' }}
          animate={{
            y: active ? [-8, -78] : [-4, -48],
            x: [0, index % 2 === 0 ? 16 : -14],
            opacity: [0, 1, 0],
            rotate: [0, index % 2 === 0 ? 18 : -16],
          }}
          transition={{ duration: 2.4 + index * 0.25, repeat: Infinity, delay: index * 0.35, ease: 'easeOut' }}
        >
          {note}
        </motion.span>
      ))}
    </div>
  )
}

function SoundRings() {
  return (
    <span className="pointer-events-none absolute inset-0 grid place-items-center">
      {[0, 1].map((index) => (
        <motion.span
          key={index}
          className="absolute h-12 w-12 rounded-full border border-spotify/80"
          animate={{ scale: [1, 1.85], opacity: [0.55, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.35, ease: 'easeOut' }}
        />
      ))}
    </span>
  )
}

const motifs = ['vinyl', 'wave', 'eq', 'cassette', 'ripple', 'staff']

export default function MadeForYouCard({
  to,
  title,
  subtitle,
  color,
  images = [],
  song,
  queue,
  index = 0,
}) {
  const { currentSong, isPlaying } = usePlayer()
  const reduce = useReducedMotion()
  const motif = motifs[index % motifs.length]
  const active = Boolean(song && currentSong?.id === song.id && isPlaying)
  const [hovered, setHovered] = useState(false)
  const live = active || hovered

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -10, rotate: index % 2 === 0 ? -1.4 : 1.4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={to} className="block">
        <div
          className="relative mb-3 aspect-square overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
          style={{ background: color }}
        >
          <motion.div
            className="pointer-events-none absolute -top-8 -left-10 h-28 w-28 rounded-full bg-white/10 blur-2xl"
            animate={reduce ? undefined : { x: [0, 18, 0], y: [0, 12, 0], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
          />

          {motif === 'vinyl' ? <VinylDisc image={images[0]} title={title} spinning={!reduce} fast={live} /> : null}
          {motif === 'wave' ? <Waveform active={active} hovered={hovered} /> : null}
          {motif === 'eq' ? <EqualizerField active={active} hovered={hovered} /> : null}
          {motif === 'cassette' ? <Cassette spinning={!reduce && live} /> : null}
          {motif === 'ripple' ? <SpeakerRipples active={live} /> : null}
          {motif === 'staff' ? <StaffNotes active={live} /> : null}
          {motif === 'vinyl' || motif === 'wave' ? <FloatingNotes active={live} /> : null}

          {motif !== 'vinyl' ? (
            <motion.div
              className="absolute right-[-10%] bottom-[-10%] flex -rotate-[18deg] gap-2"
              animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-18, -12, -18] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {images.slice(0, 2).map((image, imgIndex) => (
                <motion.div
                  key={image + imgIndex}
                  animate={reduce ? undefined : { rotate: [0, imgIndex ? 6 : -5, 0] }}
                  transition={{ duration: 4 + imgIndex, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <CoverArt
                    src={image}
                    title={title}
                    className="h-24 w-24 shadow-2xl sm:h-[6.5rem] sm:w-[6.5rem]"
                    rounded="rounded-md"
                    spinning={active && imgIndex === 0}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <div className="absolute top-3 left-3 z-10 max-w-[78%]">
            <p className="text-[11px] font-bold tracking-[0.18em] text-white/70 uppercase">Made for you</p>
            <p className="mt-1 text-lg font-black leading-tight drop-shadow-sm">{title}</p>
          </div>

          {active ? <SoundRings /> : null}

          <div
            className={`absolute right-2 bottom-2 z-20 ${
              active ? 'opacity-100' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100'
            }`}
          >
            {song ? <PlayButton song={song} queue={queue} size="md" pulse /> : null}
          </div>
        </div>
        <h3 className="truncate font-bold">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{subtitle}</p>
      </Link>
    </motion.div>
  )
}
