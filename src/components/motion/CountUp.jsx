import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { formatPlays } from '../../utils/format'

export default function CountUp({ value = 0, className = '' }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setShown(value)
      return undefined
    }

    const start = performance.now()
    const duration = 1100
    let frame = 0
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setShown(Math.round(value * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, reduce])

  return <span className={className}>{formatPlays(shown)}</span>
}
