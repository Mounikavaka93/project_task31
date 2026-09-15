import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Music,
  Mic2,
  CalendarDays,
  Sparkles,
  Disc3,
  Radio,
  Headphones,
  Guitar,
  Piano,
  AudioLines,
  Heart,
  Leaf,
  Focus,
  CloudRain,
  Dumbbell,
  PartyPopper,
} from 'lucide-react'

const icons = {
  Music,
  Mic2,
  CalendarDays,
  Sparkles,
  Disc3,
  Radio,
  Headphones,
  Guitar,
  Piano,
  AudioLines,
  Heart,
  Leaf,
  Focus,
  CloudRain,
  Dumbbell,
  PartyPopper,
}

export default function CategoryCard({ category }) {
  const Icon = icons[category.icon] || Music

  return (
    <motion.div whileHover={{ y: -6, scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 320, damping: 20 }}>
      <Link
        to={`/search?q=${encodeURIComponent(category.title)}`}
        className="group relative flex aspect-square overflow-hidden rounded-xl p-4 shadow-lg"
        style={{ backgroundColor: category.color }}
      >
        <h3 className="relative z-10 max-w-[70%] text-lg font-extrabold tracking-tight md:text-2xl">
          {category.title}
        </h3>
        <div className="absolute -right-3 -bottom-2 flex h-[58%] w-[58%] items-center justify-center rounded-md bg-black/20 shadow-2xl ring-1 ring-white/10 transition duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="h-1/2 w-1/2 text-white/90" strokeWidth={1.75} />
        </div>
      </Link>
    </motion.div>
  )
}
