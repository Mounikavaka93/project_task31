import { Children } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { staggerItem } from '../../motion/variants'

export default function StaggerGrid({ children, className = '', delay = 0.04 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: delay, delayChildren: 0.04 } },
      }}
      initial="hidden"
      animate="show"
    >
      {Children.map(children, (child) => (
        <motion.div variants={staggerItem} className="min-w-0 h-full">
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export function StaggerList({ children, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
