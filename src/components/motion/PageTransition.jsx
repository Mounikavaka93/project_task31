import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { pageFade } from '../../motion/variants'

export default function PageTransition({ routeKey, children }) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        className="min-w-0 px-5 pb-12"
        initial={reduce ? false : 'initial'}
        animate="animate"
        exit={reduce ? undefined : 'exit'}
        variants={pageFade}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
