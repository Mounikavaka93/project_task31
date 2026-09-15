import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import MadeForYouCard from '../cards/MadeForYouCard'
import AudioBars from '../motion/AudioBars'
import { getSongsByIds, playlists } from '../../data/musicData'

const MIX_IDS = ['p1', 'p9', 'p11', 'p2', 'p10', 'p12']
const MIX_COLORS = ['#1e3a5f', '#7f1d1d', '#365314', '#4a044e', '#7c2d12', '#164e63']

export default function MadeForYou() {
  const reduce = useReducedMotion()
  const items = MIX_IDS.map((id, index) => {
    const playlist = playlists.find((item) => item.id === id)
    if (!playlist) return null
    const tracks = getSongsByIds(playlist.songIds)
    return {
      playlist,
      tracks,
      index,
      title: index < 3 ? `Daily Mix ${index + 1}` : playlist.title,
    }
  }).filter(Boolean)

  return (
    <section className="relative mb-8">
      <div className="pointer-events-none absolute inset-x-0 top-8 h-40 overflow-hidden opacity-40">
        {[0, 1, 2, 3, 4].map((line) => (
          <span
            key={line}
            className="absolute inset-x-0 border-t border-white/10"
            style={{ top: `${18 + line * 16}%` }}
          />
        ))}
        {!reduce
          ? ['♪', '♫', '♩'].map((note, index) => (
              <motion.span
                key={note}
                className="absolute text-white/25"
                style={{ top: `${20 + index * 18}%` }}
                animate={{ x: ['-10%', '110%'] }}
                transition={{ duration: 14 + index * 4, repeat: Infinity, ease: 'linear', delay: index * 1.2 }}
              >
                {note}
              </motion.span>
            ))
          : null}
      </div>

      <div className="relative mb-4 flex items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.span
            className="grid h-9 w-9 place-items-center rounded-full bg-spotify text-black"
            animate={reduce ? undefined : { rotate: [0, 10, -8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            ♫
          </motion.span>
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] text-spotify uppercase">Personalized mixes</p>
            <Link to="/search?q=music" className="text-xl font-bold tracking-tight hover:underline md:text-2xl">
              Made for you
            </Link>
          </div>
          <AudioBars playing className="hidden h-6 sm:flex" bars={7} />
        </div>
        <Link
          to="/search?q=music"
          className="inline-flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-muted hover:underline"
        >
          Show all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="hide-scrollbar relative -mx-1 flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 snap-x snap-mandatory">
        {items.map((item) => (
          <motion.div
            key={item.playlist.id}
            className="w-[168px] shrink-0 snap-start sm:w-[196px] lg:w-[214px]"
            initial={reduce ? false : { opacity: 0, y: 28, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: item.index * 0.07 }}
          >
            <MadeForYouCard
              to={`/playlist/${item.playlist.id}`}
              title={item.title}
              subtitle={item.playlist.description}
              color={MIX_COLORS[item.index % MIX_COLORS.length]}
              images={item.tracks.slice(0, 2).map((song) => song.cover)}
              song={item.tracks[0]}
              queue={item.tracks}
              index={item.index}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
