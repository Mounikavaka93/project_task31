import { motion, useReducedMotion } from 'motion/react'

const orbs = [
  { className: 'bg-emerald-400/25', size: 280, x: [-40, 50, -20], y: [0, 30, -10], duration: 14 },
  { className: 'bg-violet-500/20', size: 220, x: [40, -30, 20], y: [20, -25, 15], duration: 18 },
  { className: 'bg-cyan-400/15', size: 180, x: [-10, 35, -25], y: [-20, 25, 0], duration: 16 },
]

export default function AmbientOrbs() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, index) => (
        <motion.span
          key={index}
          className={`absolute -top-16 rounded-full blur-3xl ${orb.className}`}
          style={{ width: orb.size, height: orb.size, left: `${18 + index * 28}%` }}
          animate={
            reduce
              ? { opacity: 0.55 }
              : { x: orb.x, y: orb.y, scale: [1, 1.12, 0.96, 1], opacity: [0.55, 0.85, 0.6] }
          }
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
