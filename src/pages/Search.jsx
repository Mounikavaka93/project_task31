import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import CategoryCard from '../components/cards/CategoryCard'
import MediaCard from '../components/cards/MediaCard'
import SongRow from '../components/cards/SongRow'
import PlayButton from '../components/ui/PlayButton'
import StaggerGrid, { StaggerList } from '../components/motion/StaggerGrid'
import CoverArt from '../components/ui/CoverArt'
import {
  albumTracks,
  categories,
  getSongsByIds,
  podcastToTrack,
  searchCatalog,
  songsByArtist,
} from '../data/musicData'

const filters = ['All', 'Songs', 'Artists', 'Albums', 'Playlists']

export default function Search() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const filter = params.get('type') || 'All'
  const results = useMemo(() => searchCatalog(query), [query])
  const hasQuery = query.trim().length > 0
  const totalHits =
    results.songs.length +
    results.artists.length +
    results.albums.length +
    results.playlists.length +
    results.podcasts.length

  const setFilter = (type) => {
    const next = new URLSearchParams(params)
    if (type === 'All') next.delete('type')
    else next.set('type', type)
    setParams(next)
  }

  const show = (name) => filter === 'All' || filter === name

  return (
    <div className="pb-6">
      <h1 className="sr-only">Search</h1>

      {!hasQuery ? (
        <>
          <h2 className="mb-4 text-2xl font-bold">Browse all</h2>
          <StaggerGrid className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </StaggerGrid>
        </>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  filter === item ? 'text-black' : 'text-white hover:bg-white/14'
                }`}
              >
                {filter === item ? (
                  <motion.span
                    layoutId="search-chip"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full bg-white/8" />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            ))}
          </div>

          {totalHits === 0 ? (
            <div className="py-16 text-center">
              <p className="text-2xl font-bold">No results found for “{query}”</p>
              <p className="mt-2 text-muted">Try a song, artist, album, or playlist name.</p>
            </div>
          ) : (
            <>
              {filter === 'All' && results.songs.length > 0 ? (
                <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">Top result</h2>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-lg bg-elevated p-5 transition hover:bg-highlight"
                    >
                      <CoverArt
                        src={results.songs[0].cover}
                        title={results.songs[0].title}
                        className="h-28 w-28 shadow-xl"
                        rounded="rounded-lg"
                      />
                      <h3 className="mt-4 truncate text-3xl font-extrabold">
                        {results.songs[0].title}
                      </h3>
                      <p className="mt-1 text-muted">Song · {results.songs[0].artist}</p>
                      <div className="mt-4">
                        <PlayButton song={results.songs[0]} queue={results.songs} size="lg" pulse />
                      </div>
                    </motion.div>
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">Songs</h2>
                    <StaggerList>
                      {results.songs.slice(0, 4).map((song, index) => (
                        <SongRow
                          key={song.id}
                          song={song}
                          index={index + 1}
                          queue={results.songs}
                          showAlbum={false}
                        />
                      ))}
                    </StaggerList>
                  </div>
                </div>
              ) : null}

              {show('Songs') && filter === 'Songs' && results.songs.length ? (
                <section className="mb-8">
                  <h2 className="mb-3 text-2xl font-bold">Songs</h2>
                  {results.songs.map((song, index) => (
                    <SongRow key={song.id} song={song} index={index + 1} queue={results.songs} />
                  ))}
                </section>
              ) : null}

              {show('Artists') && results.artists.length ? (
                <section className="mb-8">
                  <h2 className="mb-3 text-2xl font-bold">Artists</h2>
                  <StaggerGrid className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                    {results.artists.map((artist) => {
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
                  </StaggerGrid>
                </section>
              ) : null}

              {show('Albums') && results.albums.length ? (
                <section className="mb-8">
                  <h2 className="mb-3 text-2xl font-bold">Albums</h2>
                  <StaggerGrid className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                    {results.albums.map((album) => {
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
                  </StaggerGrid>
                </section>
              ) : null}

              {show('Playlists') && results.playlists.length ? (
                <section className="mb-8">
                  <h2 className="mb-3 text-2xl font-bold">Playlists</h2>
                  <StaggerGrid className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                    {results.playlists.map((playlist) => {
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
                  </StaggerGrid>
                </section>
              ) : null}

              {filter === 'All' && results.podcasts.length ? (
                <section className="mb-4">
                  <h2 className="mb-3 text-2xl font-bold">Podcasts</h2>
                  <StaggerGrid className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                    {results.podcasts.map((podcast) => {
                      const track = podcastToTrack(podcast)
                      return (
                        <MediaCard
                          key={podcast.id}
                          to={`/search?q=${encodeURIComponent(podcast.title)}`}
                          image={podcast.cover}
                          title={podcast.title}
                          subtitle={podcast.creator}
                          song={track}
                          queue={[track]}
                        />
                      )
                    })}
                  </StaggerGrid>
                </section>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  )
}
