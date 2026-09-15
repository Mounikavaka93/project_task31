import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'motion/react'
import MediaCard from '../components/cards/MediaCard'
import SongRow from '../components/cards/SongRow'
import PlayButton from '../components/ui/PlayButton'
import SectionHeader from '../components/ui/SectionHeader'
import StaggerGrid, { StaggerList } from '../components/motion/StaggerGrid'
import CountUp from '../components/motion/CountUp'
import AnimatedText from '../components/motion/AnimatedText'
import { albumsByArtist, getArtist, songsByArtist } from '../data/musicData'

export default function Artist() {
  const { id } = useParams()
  const artist = getArtist(id)
  const [following, setFollowing] = useState(false)

  if (!artist) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Artist not found</h1>
        <Link to="/" className="mt-3 inline-block text-spotify hover:underline">
          Back home
        </Link>
      </div>
    )
  }

  const popular = songsByArtist(artist.id)
  const artistAlbums = albumsByArtist(artist.id)

  return (
    <div className="-mx-5">
      <header
        className="relative flex min-h-[280px] flex-col justify-end overflow-hidden px-5 pb-8 md:min-h-[340px]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%), url(${artist.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <motion.img
            src={artist.image}
            alt=""
            className="h-32 w-32 rounded-full object-cover shadow-2xl ring-4 ring-black/20 md:h-44 md:w-44"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <p className="text-sm font-semibold">Verified Artist</p>
            <AnimatedText
              text={artist.name}
              as="h1"
              className="mt-1 text-4xl font-extrabold tracking-tight md:text-7xl"
            />
            <p className="mt-3 text-sm text-white/85">
              <CountUp value={artist.monthlyListeners} /> monthly listeners
            </p>
          </motion.div>
        </div>
      </header>

      <div className="bg-black/25 px-5 pt-6">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <PlayButton song={popular[0]} queue={popular} size="lg" pulse />
          <motion.button
            type="button"
            onClick={() => setFollowing((value) => !value)}
            whileTap={{ scale: 0.92 }}
            animate={following ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            className={`rounded-full border px-5 py-1.5 text-sm font-bold transition ${
              following ? 'border-spotify bg-spotify text-black' : 'border-white/40 hover:border-white'
            }`}
          >
            {following ? 'Following' : 'Follow'}
          </motion.button>
        </div>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-bold">Popular</h2>
          <StaggerList>
            {popular.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                index={index + 1}
                queue={popular}
                showAlbum={false}
                showPlays
              />
            ))}
          </StaggerList>
        </section>

        <section className="mb-10">
          <SectionHeader title="Albums and singles" />
          <StaggerGrid className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {artistAlbums.map((album) => {
              const queue = popular.filter((song) => song.albumId === album.id)
              return (
                <MediaCard
                  key={album.id}
                  to={`/album/${album.id}`}
                  image={album.cover}
                  title={album.title}
                  subtitle={`${album.year} · Album`}
                  song={queue[0] || popular[0]}
                  queue={queue.length ? queue : popular}
                />
              )
            })}
          </StaggerGrid>
        </section>

        <section className="mb-8 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold">About</h2>
          <p className="text-sm leading-7 text-white/80 md:text-base">{artist.bio}</p>
          <p className="mt-3 text-sm text-muted">
            {artist.genres.join(' · ')} · {artist.followers} followers
          </p>
        </section>
      </div>
    </div>
  )
}
