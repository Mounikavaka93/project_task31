import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import MediaCard from '../components/cards/MediaCard'
import { getSongsByIds, playlists, songs } from '../data/musicData'
import { usePlayer } from '../context/PlayerContext'

export default function Library() {
  const { likedIds } = usePlayer()
  const liked = songs.filter((song) => likedIds.includes(song.id))

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold md:text-3xl">Your Library</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        <motion.div
          className="col-span-2"
          whileHover={{ scale: 1.015, y: -4 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        >
          <Link
            to="/liked"
            className="group flex h-full min-h-[180px] flex-col justify-end rounded-lg bg-gradient-to-br from-indigo-700 via-indigo-500 to-emerald-200 p-5"
          >
            <div className="mb-3 flex -space-x-2">
              {liked.slice(0, 4).map((song) => (
                <img key={song.id} src={song.cover} alt="" className="h-10 w-10 rounded object-cover ring-2 ring-white/30" />
              ))}
            </div>
            <p className="flex items-center gap-2 text-2xl font-extrabold">
              <Heart className="h-5 w-5 fill-current" /> Liked Songs
            </p>
            <p className="mt-1 text-sm text-white/80">{liked.length} liked songs</p>
          </Link>
        </motion.div>

        {playlists.map((playlist) => {
          const tracks = getSongsByIds(playlist.songIds)
          return (
            <MediaCard
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              image={playlist.cover}
              title={playlist.title}
              subtitle={`Playlist · ${tracks.length} songs`}
              song={tracks[0]}
              queue={tracks}
            />
          )
        })}
      </div>
    </div>
  )
}
