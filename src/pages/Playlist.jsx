import { Clock3, MoreHorizontal } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'motion/react'
import SongRow from '../components/cards/SongRow'
import PlayButton from '../components/ui/PlayButton'
import { StaggerList } from '../components/motion/StaggerGrid'
import LikeHeart from '../components/motion/LikeHeart'
import AnimatedText from '../components/motion/AnimatedText'
import { getPlaylist, getSongsByIds } from '../data/musicData'
import { formatTotalDuration, totalDuration } from '../utils/format'

export default function Playlist() {
  const { id } = useParams()
  const playlist = getPlaylist(id)
  const [saved, setSaved] = useState(false)

  if (!playlist) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Playlist not found</h1>
        <Link to="/" className="mt-3 inline-block text-spotify hover:underline">
          Back home
        </Link>
      </div>
    )
  }

  const tracks = getSongsByIds(playlist.songIds)

  return (
    <div className="-mx-5">
      <header
        className="flex flex-col gap-6 px-5 pt-4 pb-8 md:flex-row md:items-end"
        style={{
          background: `linear-gradient(180deg, ${playlist.color} 0%, rgba(18,18,18,0.92) 100%)`,
        }}
      >
        <motion.img
          src={playlist.cover}
          alt=""
          className="h-44 w-44 rounded shadow-2xl md:h-56 md:w-56"
          initial={{ opacity: 0, scale: 0.86, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        />
        <div className="min-w-0">
          <p className="text-sm font-bold">Playlist</p>
          <AnimatedText
            text={playlist.title}
            as="h1"
            className="mt-1 text-4xl font-extrabold tracking-tight md:text-6xl"
          />
          <p className="mt-3 text-sm text-white/80 md:text-base">{playlist.description}</p>
          <p className="mt-3 text-sm text-white/90">
            <span className="font-bold">{playlist.owner}</span>
            <span> · {tracks.length} songs, {formatTotalDuration(totalDuration(tracks))}</span>
          </p>
        </div>
      </header>

      <div className="bg-black/20 px-5 pt-6">
        <div className="mb-4 flex items-center gap-4">
          <PlayButton song={tracks[0]} queue={tracks} size="lg" pulse />
          <LikeHeart liked={saved} onToggle={() => setSaved((value) => !value)} className="text-muted hover:text-spotify" size="lg" />
          <button type="button" className="text-muted hover:text-white" aria-label="More">
            <MoreHorizontal className="h-8 w-8" />
          </button>
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
      </div>
    </div>
  )
}
