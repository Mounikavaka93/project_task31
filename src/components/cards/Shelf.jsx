import { Children } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SectionHeader from '../ui/SectionHeader'
import { easeOut } from '../../motion/variants'

export default function Shelf({ title, to, children }) {
  const reduce = useReducedMotion()
  const items = Children.toArray(children)

  return (
    <section className="mb-7">
      <SectionHeader title={title} to={to} />
      <div className="hide-scrollbar -mx-1 flex gap-4 overflow-x-auto scroll-smooth px-1 pb-1 snap-x snap-mandatory">
        {items.map((child, index) => (
          <motion.div
            key={child.key || index}
            className="w-[148px] shrink-0 snap-start sm:w-[168px] lg:w-[180px]"
            initial={reduce ? false : { opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: index * 0.045, ease: easeOut }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
