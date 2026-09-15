import { useState } from 'react'
import { Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { springPop } from '../../motion/variants'

const sparks = [
  { x: -10, y: -14 },
  { x: 12, y: -12 },
  { x: 14, y: 8 },
  { x: -12, y: 10 },
  { x: 0, y: -18 },
  { x: 8, y: 14 },
]

export default function LikeHeart({ liked, onToggle, className = '', size = 'md' }) {
  const [burst, setBurst] = useState(false)
  const icon = size === 'lg' ? 'h-8 w-8' : 'h-4 w-4'

  return (
    <button
      type="button"
      aria-label={liked ? 'Remove from liked songs' : 'Like song'}
      onClick={(event) => {
        event.stopPropagation()
        if (!liked) {
          setBurst(true)
          window.setTimeout(() => setBurst(false), 450)
        }
        onToggle()
      }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <motion.span
        animate={{ scale: liked ? 1 : 1 }}
        whileTap={{ scale: 0.75 }}
        transition={springPop}
        className={liked ? 'text-spotify' : 'text-current'}
      >
        <motion.span animate={{ scale: liked ? [1, 1.35, 1] : 1 }} transition={springPop} className="block">
          <Heart className={`${icon} ${liked ? 'fill-current' : ''}`} />
        </motion.span>
      </motion.span>
      <AnimatePresence>
        {burst ? (
          <span className="pointer-events-none absolute inset-0">
            {sparks.map((spark, index) => (
              <motion.span
                key={index}
                className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-spotify"
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: spark.x, y: spark.y, scale: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            ))}
          </span>
        ) : null}
      </AnimatePresence>
    </button>
  )
}
