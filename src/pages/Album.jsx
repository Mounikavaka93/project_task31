import { Clock3, MoreHorizontal } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import SongRow from '../components/cards/SongRow'
import PlayButton from '../components/ui/PlayButton'
import { StaggerList } from '../components/motion/StaggerGrid'
import { albumTracks, getAlbum } from '../data/musicData'
import { formatTotalDuration, totalDuration } from '../utils/format'

export default function Album() {
  const { id } = useParams()
  const album = getAlbum(id)

  if (!album) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Album not found</h1>
        <Link to="/" className="mt-3 inline-block text-spotify hover:underline">
          Back home
        </Link>
      </div>
    )
  }

  const tracks = albumTracks(album.id)

  return (
    <div className="-mx-5">
      <header className="flex flex-col gap-6 bg-gradient-to-b from-[#3e3e3e] to-surface px-5 pt-4 pb-8 md:flex-row md:items-end">
        <motion.img
          src={album.cover}
          alt=""
          className="h-44 w-44 rounded shadow-2xl md:h-56 md:w-56"
          initial={{ opacity: 0, scale: 0.86, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        />
        <div>
          <p className="text-sm font-bold">Album</p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight md:text-6xl">
            {album.title}
          </h1>
          <p className="mt-3 text-sm">
            <Link to={`/artist/${album.artistId}`} className="font-bold hover:underline">
              {album.artist}
            </Link>
            <span className="text-white/80"> · {album.year} · {tracks.length} songs, {formatTotalDuration(totalDuration(tracks))}</span>
          </p>
        </div>
      </header>

      <div className="bg-black/20 px-5 pt-6">
        <div className="mb-4 flex items-center gap-4">
          <PlayButton song={tracks[0]} queue={tracks} size="lg" pulse />
          <button type="button" className="text-muted hover:text-white" aria-label="More">
            <MoreHorizontal className="h-8 w-8" />
          </button>
        </div>
        <div className="hidden items-center gap-3 border-b border-white/10 px-3 pb-2 text-xs font-bold tracking-wider text-muted uppercase md:grid md:grid-cols-[16px_minmax(0,1fr)_40px_80px]">
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
            <SongRow key={song.id} song={song} index={index + 1} queue={tracks} showAlbum={false} />
          ))}
        </StaggerList>
      </div>
    </div>
  )
}
