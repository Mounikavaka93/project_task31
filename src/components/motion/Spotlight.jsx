import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export default function Spotlight({ x, y }) {
  const reduce = useReducedMotion()
  const sx = useSpring(x, { stiffness: 70, damping: 22, mass: 0.55 })
  const sy = useSpring(y, { stiffness: 70, damping: 22, mass: 0.55 })
  const background = useMotionTemplate`radial-gradient(620px circle at ${sx}% ${sy}%, rgba(29,185,84,0.16), rgba(88,86,214,0.08) 30%, transparent 58%)`

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ background }}
    />
  )
}

export function useSpotlight() {
  const x = useMotionValue(38)
  const y = useMotionValue(10)

  const onMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100)
    y.set(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100)
  }

  return { x, y, onMouseMove }
}
