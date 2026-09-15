export const easeOut = [0.22, 1, 0.36, 1]

export const pageFade = {
  initial: { opacity: 0, y: 28, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.985,
    transition: { duration: 0.28, ease: easeOut },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.06 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: easeOut },
  },
}

export const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
}

export const listItem = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
}

export const springPop = {
  type: 'spring',
  stiffness: 520,
  damping: 22,
  mass: 0.7,
}
