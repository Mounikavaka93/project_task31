import { useState } from 'react'
import { Music } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const palettes = [
  'from-emerald-500 to-teal-900',
  'from-violet-500 to-indigo-900',
  'from-rose-500 to-orange-800',
  'from-sky-400 to-blue-900',
  'from-fuchsia-500 to-purple-900',
  'from-amber-400 to-red-800',
  'from-lime-400 to-green-900',
  'from-cyan-400 to-slate-900',
]

function paletteFor(seed = '') {
  let hash = 0
  for (const char of seed) hash = (hash + char.charCodeAt(0) * 17) % palettes.length
  return palettes[hash]
}

export default function CoverArt({
  src,
  alt = '',
  title = '',
  className = '',
  rounded = 'rounded',
  spinning = false,
}) {
  const [failed, setFailed] = useState(!src)
  const reduce = useReducedMotion()
  const label = (title || alt || '♪').trim().charAt(0).toUpperCase()
  const shouldSpin = spinning && !reduce

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${paletteFor(src || title)} ${rounded} ${className}`}>
      <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white/35">
        {label || <Music className="h-1/3 w-1/3" />}
      </span>
      {!failed && src ? (
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
          animate={shouldSpin ? { rotate: 360 } : { rotate: 0, scale: 1 }}
          whileHover={shouldSpin ? undefined : { scale: 1.06 }}
          transition={
            shouldSpin
              ? { duration: 9, repeat: Infinity, ease: 'linear' }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        />
      ) : null}
      {shouldSpin ? (
        <span className="pointer-events-none absolute inset-[42%] rounded-full bg-black/70 ring-1 ring-white/20" />
      ) : null}
    </div>
  )
}
