import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import MediaCard from '../components/cards/MediaCard'
import { useAuth } from '../context/AuthContext'
import { getSongsByIds, playlists, recentlyPlayedIds } from '../data/musicData'
import AnimatedText from '../components/motion/AnimatedText'

export default function Profile() {
  const { user } = useAuth()
  const recent = getSongsByIds(recentlyPlayedIds)
  const initials = user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="-mx-5 pb-8">
      <header className="flex flex-col gap-6 bg-gradient-to-b from-[#535353] to-surface px-5 pt-6 pb-8 md:flex-row md:items-end">
        <motion.div
          initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          whileHover={{ scale: 1.06, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="flex h-36 w-36 items-center justify-center rounded-full bg-emerald-800 text-5xl font-extrabold shadow-2xl md:h-48 md:w-48"
        >
          {initials}
        </motion.div>
        <div>
          <p className="text-sm font-bold">Profile</p>
          <AnimatedText
            text={user?.name || 'Profile'}
            as="h1"
            className="mt-1 text-4xl font-extrabold md:text-7xl"
          />
          <p className="mt-3 text-sm text-white/85">
            {user?.playlists || 0} public playlists · {user?.followers || 0} followers · {user?.following || 0} following
          </p>
          <Link
            to="/settings"
            className="mt-4 inline-flex rounded-full border border-white/40 px-4 py-1.5 text-sm font-bold hover:border-white"
          >
            Edit profile
          </Link>
        </div>
      </header>

      <section className="px-5 pt-6">
        <h2 className="mb-3 text-2xl font-bold">Public playlists</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {playlists.slice(0, 6).map((playlist) => {
            const tracks = getSongsByIds(playlist.songIds)
            return (
              <MediaCard
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                image={playlist.cover}
                title={playlist.title}
                subtitle={playlist.description}
                song={tracks[0]}
                queue={tracks}
              />
            )
          })}
        </div>
      </section>

      <section className="mt-8 px-5">
        <h2 className="mb-3 text-2xl font-bold">Recently played</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {recent.map((song) => (
            <MediaCard
              key={song.id}
              to={`/album/${song.albumId}`}
              image={song.cover}
              title={song.title}
              subtitle={song.artist}
              song={song}
              queue={recent}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
