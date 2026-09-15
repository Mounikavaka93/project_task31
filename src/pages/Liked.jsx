import { Clock3, Heart } from 'lucide-react'
import { motion } from 'motion/react'
import PlayButton from '../components/ui/PlayButton'
import SongRow from '../components/cards/SongRow'
import { StaggerList } from '../components/motion/StaggerGrid'
import { songs } from '../data/musicData'
import { usePlayer } from '../context/PlayerContext'
import { formatTotalDuration, totalDuration } from '../utils/format'

export default function Liked() {
  const { likedIds } = usePlayer()
  const tracks = songs.filter((song) => likedIds.includes(song.id))

  return (
    <div className="-mx-5">
      <header className="flex flex-col gap-6 bg-gradient-to-b from-indigo-700 to-surface px-5 pt-6 pb-8 md:flex-row md:items-end">
        <motion.div
          initial={{ scale: 0.85, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.04, rotate: -2 }}
          className="flex h-44 w-44 items-center justify-center rounded shadow-2xl bg-gradient-to-br from-indigo-500 to-emerald-200 md:h-56 md:w-56"
        >
          <Heart className="h-16 w-16 fill-white text-white md:h-20 md:w-20" />
        </motion.div>
        <div>
          <p className="text-sm font-bold">Playlist</p>
          <h1 className="mt-1 text-4xl font-extrabold md:text-6xl">Liked Songs</h1>
          <p className="mt-3 text-sm text-white/90">
            {tracks.length} songs
            {tracks.length ? ` · ${formatTotalDuration(totalDuration(tracks))}` : ''}
          </p>
        </div>
      </header>

      <div className="bg-black/20 px-5 pt-6">
        {tracks.length ? (
          <>
            <div className="mb-4">
              <PlayButton song={tracks[0]} queue={tracks} size="lg" pulse />
            </div>
            <div className="hidden items-center gap-3 border-b border-white/10 px-3 pb-2 text-xs font-bold tracking-wider text-muted uppercase md:grid md:grid-cols-[16px_minmax(0,2fr)_minmax(0,1.4fr)_40px_80px]">
              <span>#</span>
              <span>Title</span>
              <span>Album</span>
              <span />
              <span className="justify-self-end">
                <Clock3 className="h-4 w-4" />
              </span>
            </div>
            <StaggerList className="mt-2">
              {tracks.map((song, index) => (
                <SongRow key={song.id} song={song} index={index + 1} queue={tracks} />
              ))}
            </StaggerList>
          </>
        ) : (
          <p className="py-12 text-center text-muted">Songs you like will appear here.</p>
        )}
      </div>
    </div>
  )
}
