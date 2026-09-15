import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import MediaCard from '../components/cards/MediaCard'
import ShortcutTile from '../components/cards/ShortcutTile'
import Shelf from '../components/cards/Shelf'
import MadeForYou from '../components/home/MadeForYou'
import AmbientOrbs from '../components/motion/AmbientOrbs'
import AnimatedText from '../components/motion/AnimatedText'
import StaggerGrid from '../components/motion/StaggerGrid'
import {
  albums,
  albumTracks,
  artists,
  featuredPlaylistId,
  getPlaylist,
  getSongsByIds,
  playlists,
  podcastToTrack,
  podcasts,
  recentlyPlayedIds,
  songs,
  songsByArtist,
} from '../data/musicData'
import { greetingForNow } from '../utils/format'

export default function Home() {
  const [homeFilter, setHomeFilter] = useState('all')
  const featured = getPlaylist(featuredPlaylistId)
  const featuredTracks = getSongsByIds(featured.songIds)
  const recent = getSongsByIds(recentlyPlayedIds)
  const podcastTracks = podcasts.map(podcastToTrack)
  const greeting = greetingForNow()
  const shortcuts = [
    ...recent.slice(0, 6).map((song) => ({
      id: song.id,
      title: song.title,
      image: song.cover,
      to: `/album/${song.albumId}`,
      song,
      queue: recent,
    })),
    {
      id: featured.id,
      title: featured.title,
      image: featured.cover,
      to: `/playlist/${featured.id}`,
      song: featuredTracks[0],
      queue: featuredTracks,
    },
    {
      id: 'liked',
      title: 'Liked Songs',
      image: recent[0]?.cover,
      to: '/liked',
      song: recent[0],
      queue: recent,
    },
  ].slice(0, 8)

  const showMusic = homeFilter !== 'podcasts'
  const showPodcasts = homeFilter !== 'music'
  const hindiHits = songs.filter((song) => song.language === 'hindi')
  const englishHits = songs.filter((song) => song.language === 'english')

  return (
    <div className="pb-4">
      <section className="relative -mx-5 mb-6 overflow-hidden px-5 pt-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#533a1b] to-transparent opacity-80" />
        <AmbientOrbs />
        <div className="relative">
          <AnimatedText
            text={greeting}
            className="mb-4 text-2xl font-extrabold tracking-tight md:text-3xl"
          />
          <div className="mb-5 flex flex-wrap gap-2">
            {['all', 'music', 'podcasts'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setHomeFilter(item)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
                  homeFilter === item ? 'text-black' : 'text-white hover:bg-white/14'
                }`}
              >
                {homeFilter === item ? (
                  <motion.span
                    layoutId="home-chip"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full bg-white/8" />
                )}
                <span className="relative z-10">
                  {item === 'all' ? 'All' : item === 'music' ? 'Music' : 'Podcasts'}
                </span>
              </button>
            ))}
          </div>

          {showMusic ? (
            <StaggerGrid className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {shortcuts.map((item) => (
                <ShortcutTile key={item.id} item={item} queue={item.queue} />
              ))}
            </StaggerGrid>
          ) : null}
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={homeFilter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >

      {showMusic ? (
        <>
          <MadeForYou />

          <Shelf title="Jump back in" to="/library">
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
          </Shelf>

          <Shelf title="Tollywood hits" to="/search?q=telugu">
            {playlists
              .filter((playlist) => ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'].includes(playlist.id))
              .map((playlist) => {
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
          </Shelf>

          <Shelf title="Bollywood Butter" to="/search?q=bollywood">
            {hindiHits.map((song) => (
              <MediaCard
                key={song.id}
                to={`/album/${song.albumId}`}
                image={song.cover}
                title={song.title}
                subtitle={song.artist}
                song={song}
                queue={hindiHits}
              />
            ))}
          </Shelf>

          <Shelf title="Hollywood hits" to="/search?q=english">
            {englishHits.map((song) => (
              <MediaCard
                key={song.id}
                to={`/album/${song.albumId}`}
                image={song.cover}
                title={song.title}
                subtitle={song.artist}
                song={song}
                queue={englishHits}
              />
            ))}
          </Shelf>

          <Shelf title="Popular artists" to="/search?q=artists">
            {artists.slice(0, 12).map((artist) => {
              const queue = songsByArtist(artist.id)
              return (
                <MediaCard
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  image={artist.image}
                  title={artist.name}
                  subtitle="Artist"
                  song={queue[0]}
                  queue={queue}
                  rounded="full"
                />
              )
            })}
          </Shelf>

          <Shelf title="Popular albums" to="/search?q=albums">
            {albums.slice(0, 12).map((album) => {
              const tracks = albumTracks(album.id)
              return (
                <MediaCard
                  key={album.id}
                  to={`/album/${album.id}`}
                  image={album.cover}
                  title={album.title}
                  subtitle={album.artist}
                  song={tracks[0]}
                  queue={tracks}
                />
              )
            })}
          </Shelf>
        </>
      ) : null}

      {showPodcasts ? (
        <Shelf title="Shows to try" to="/search?q=podcasts">
          {podcasts.map((podcast, index) => (
            <MediaCard
              key={podcast.id}
              to={`/search?q=${encodeURIComponent(podcast.title)}`}
              image={podcast.cover}
              title={podcast.title}
              subtitle={podcast.creator}
              song={podcastTracks[index]}
              queue={podcastTracks}
            />
          ))}
        </Shelf>
      ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
