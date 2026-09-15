import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { motion } from 'motion/react'
import { formatDuration, formatPlays } from '../../utils/format'
import { usePlayer } from '../../context/PlayerContext'
import LikeHeart from '../motion/LikeHeart'
import CoverArt from '../ui/CoverArt'

export default function SongRow({
  song,
  index,
  queue,
  showAlbum = true,
  showPlays = false,
}) {
  const { currentSong, isPlaying, playAt, playPause, isLiked, toggleLike } = usePlayer()
  const active = currentSong?.id === song.id
  const playing = active && isPlaying

  const onPlay = () => {
    if (active) playPause()
    else playAt(song, queue)
  }

  const columns = showPlays
    ? 'grid-cols-[16px_minmax(0,1fr)_auto] md:grid-cols-[16px_minmax(0,2fr)_minmax(0,1fr)_40px_80px]'
    : showAlbum
      ? 'grid-cols-[16px_minmax(0,1fr)_auto] md:grid-cols-[16px_minmax(0,2fr)_minmax(0,1.4fr)_40px_80px]'
      : 'grid-cols-[16px_minmax(0,1fr)_auto] md:grid-cols-[16px_minmax(0,1fr)_40px_80px]'

  return (
    <motion.div
      onClick={(event) => {
        if (event.target.closest('a, button')) return
        onPlay()
      }}
      onDoubleClick={onPlay}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`group grid items-center gap-3 rounded-md px-2 py-2 text-sm text-muted md:px-3 ${columns} ${active ? 'bg-white/6' : ''}`}
    >
      <button
        type="button"
        onClick={onPlay}
        className="relative flex h-4 w-4 items-center justify-center"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <span className="flex h-3.5 items-end gap-[2px]">
            <span className="eq-bar h-2" />
            <span className="eq-bar h-3" />
            <span className="eq-bar h-2.5" />
          </span>
        ) : (
          <>
            <span className={`tabular-nums group-hover:hidden ${active ? 'text-spotify' : ''}`}>{index}</span>
            <Play className="hidden h-3.5 w-3.5 fill-current text-white group-hover:block" />
          </>
        )}
      </button>

      <div className="flex min-w-0 items-center gap-3">
        <div className={`relative h-10 w-10 shrink-0 ${playing ? 'ring-2 ring-spotify rounded' : ''}`}>
          <CoverArt
            src={song.cover}
            title={song.title}
            className="h-10 w-10"
            rounded="rounded"
          />
        </div>
        <div className="min-w-0">
          <p className={`truncate font-medium ${active ? 'text-spotify' : 'text-white'}`}>
            {song.title}
          </p>
          {song.artistId ? (
            <Link to={`/artist/${song.artistId}`} className="truncate text-sm hover:underline">
              {song.artist}
            </Link>
          ) : (
            <p className="truncate text-sm">{song.artist}</p>
          )}
        </div>
      </div>

      {showAlbum ? (
        <Link
          to={song.albumId ? `/album/${song.albumId}` : '#'}
          className="hidden truncate hover:underline md:block"
        >
          {song.album}
        </Link>
      ) : null}

      {showPlays ? (
        <span className="hidden tabular-nums md:block">{formatPlays(song.plays)}</span>
      ) : null}

      <div
        className={`hidden justify-self-end md:inline-flex ${
          isLiked(song.id) ? '' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <LikeHeart liked={isLiked(song.id)} onToggle={() => toggleLike(song.id)} className={isLiked(song.id) ? '' : 'text-muted hover:text-white'} />
      </div>

      <span className="justify-self-end tabular-nums">{formatDuration(song.duration)}</span>
    </motion.div>
  )
}
