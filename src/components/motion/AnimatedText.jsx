import { motion, useReducedMotion } from 'motion/react'
import { easeOut } from '../../motion/variants'

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'p',
}) {
  const reduce = useReducedMotion()
  const words = String(text || '').split(' ')

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block pr-[0.28em]"
            initial={{ y: '110%', opacity: 0, rotate: 6 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.55, delay: delay + index * 0.07, ease: easeOut }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
