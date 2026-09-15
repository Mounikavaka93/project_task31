import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function SectionHeader({ title, to, action = 'Show all' }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      {to ? (
        <Link to={to} className="text-xl font-bold tracking-tight hover:underline md:text-2xl">
          {title}
        </Link>
      ) : (
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      )}
      {to ? (
        <Link
          to={to}
          className="inline-flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-muted hover:underline"
        >
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  )
}
