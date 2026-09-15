import { motion, useReducedMotion } from 'motion/react'

const heights = [28, 52, 36, 64, 40, 72, 44, 58, 32, 66, 38, 48]

export default function AudioBars({ playing, className = '', bars = 12 }) {
  const reduce = useReducedMotion()

  return (
    <div className={`flex h-8 items-end gap-[3px] ${className}`} aria-hidden="true">
      {heights.slice(0, bars).map((peak, index) => (
        <motion.span
          key={index}
          className="w-[3px] rounded-full bg-spotify origin-bottom"
          initial={{ height: 4 }}
          animate={
            reduce
              ? { height: playing ? peak * 0.35 : 4 }
              : playing
                ? { height: [6, peak, 10, peak * 0.7, 8] }
                : { height: 4 }
          }
          transition={
            playing && !reduce
              ? {
                  duration: 0.55 + (index % 5) * 0.12,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: index * 0.05,
                }
              : { duration: 0.25 }
          }
        />
      ))}
    </div>
  )
}
