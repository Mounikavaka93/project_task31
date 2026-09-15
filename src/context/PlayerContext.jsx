import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { songs as allSongs } from '../data/musicData'
import { loadYouTubeApi } from '../lib/youtube'

const PlayerContext = createContext(null)
const YT_ENDED = 0
const YT_PLAYING = 1

function nextRepeat(mode) {
  if (mode === 'off') return 'all'
  if (mode === 'all') return 'one'
  return 'off'
}

function buildQueue(song, list) {
  const source = list?.length ? list : allSongs
  if (!song) return source
  if (source.some((item) => item.id === song.id)) {
    return source.length > 1 ? source : allSongs
  }
  return [song, ...allSongs.filter((item) => item.id !== song.id)]
}

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(allSongs[0])
  const [queue, setQueue] = useState(allSongs)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(allSongs[0]?.duration || 0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState('all')
  const [likedIds, setLikedIds] = useState(['s10', 's4', 's1', 's14'])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const audioRef = useRef(null)
  const ytPlayerRef = useRef(null)
  const ytReadyRef = useRef(false)
  const engineRef = useRef('none')
  const currentRef = useRef(currentSong)
  const queueRef = useRef(queue)
  const shuffleRef = useRef(shuffle)
  const repeatRef = useRef(repeat)
  const loadedIdRef = useRef(null)
  const skipToRef = useRef(() => {})
  const usingFallbackRef = useRef(false)

  useEffect(() => {
    currentRef.current = currentSong
    queueRef.current = queue
    shuffleRef.current = shuffle
    repeatRef.current = repeat
  }, [currentSong, queue, shuffle, repeat])

  const applyVolume = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.muted = muted
      audio.volume = muted ? 0 : volume
    }
    const yt = ytPlayerRef.current
    if (yt && typeof yt.setVolume === 'function') {
      try {
        yt.setVolume(muted ? 0 : Math.round(volume * 100))
        if (muted) yt.mute()
        else yt.unMute()
      } catch {
        /* ignore */
      }
    }
  }, [muted, volume])

  const skipTo = useCallback((direction) => {
    const song = currentRef.current
    let list = queueRef.current?.length ? queueRef.current : allSongs
    let index = list.findIndex((item) => item.id === song?.id)
    if (index < 0) {
      list = allSongs
      index = Math.max(0, list.findIndex((item) => item.id === song?.id))
    }

    let nextSong = null
    if (shuffleRef.current && list.length > 1) {
      const others = list.filter((item) => item.id !== song?.id)
      nextSong = others[Math.floor(Math.random() * others.length)]
    } else {
      const nextIndex = (index + direction + list.length) % list.length
      nextSong = list[nextIndex]
    }

    if (!nextSong) return
    loadedIdRef.current = null
    usingFallbackRef.current = false
    setQueue(list)
    setCurrentSong(nextSong)
    setProgress(0)
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    skipToRef.current = skipTo
  }, [skipTo])

  const playPreview = useCallback(
    async (song, shouldPlay) => {
      const audio = audioRef.current
      if (!audio || !song?.audio) return false
      engineRef.current = 'audio'
      if (loadedIdRef.current !== `${song.id}-preview`) {
        loadedIdRef.current = `${song.id}-preview`
        audio.src = song.audio
        audio.load()
        setProgress(0)
        setDuration(song.duration || 30)
      }
      audio.loop = repeatRef.current === 'one'
      applyVolume()
      if (shouldPlay) {
        try {
          await audio.play()
          return true
        } catch {
          setIsPlaying(false)
          return false
        }
      }
      audio.pause()
      return true
    },
    [applyVolume],
  )

  const onYouTubeError = useCallback(() => {
    const song = currentRef.current
    if (!song?.audio || usingFallbackRef.current) return
    usingFallbackRef.current = true
    loadedIdRef.current = null
    try {
      ytPlayerRef.current?.pauseVideo()
    } catch {
      /* ignore */
    }
    playPreview(song, true)
  }, [playPreview])

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'auto'
    audioRef.current = audio

    const onTime = () => {
      if (engineRef.current === 'audio') setProgress(audio.currentTime || 0)
    }
    const onMeta = () => {
      if (engineRef.current === 'audio' && Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration)
      }
    }
    const onEnded = () => {
      if (engineRef.current !== 'audio') return
      if (repeatRef.current === 'one') {
        audio.currentTime = 0
        audio.play().catch(() => setIsPlaying(false))
        return
      }
      skipToRef.current(1)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('durationchange', onMeta)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('durationchange', onMeta)
      audio.removeEventListener('ended', onEnded)
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const waitForYouTube = useCallback(async () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function' && ytReadyRef.current) {
      return ytPlayerRef.current
    }
    const started = Date.now()
    return new Promise((resolve) => {
      const tick = () => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function' && ytReadyRef.current) {
          resolve(ytPlayerRef.current)
          return
        }
        if (Date.now() - started > 1800) {
          resolve(null)
          return
        }
        window.setTimeout(tick, 80)
      }
      tick()
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    loadYouTubeApi().then((YT) => {
      if (cancelled) return
      if (ytPlayerRef.current?.destroy) {
        try {
          ytPlayerRef.current.destroy()
        } catch {
          /* ignore */
        }
        ytPlayerRef.current = null
      }
      ytReadyRef.current = false
      const mount = document.getElementById('yt-audio-engine')
      if (!mount) return
      new YT.Player('yt-audio-engine', {
        width: 240,
        height: 135,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            ytPlayerRef.current = event.target
            ytReadyRef.current = true
          },
          onStateChange: (event) => {
            if (engineRef.current !== 'youtube') return
            if (event.data === YT_ENDED) {
              if (repeatRef.current === 'one') {
                event.target.seekTo(0, true)
                event.target.playVideo()
                return
              }
              skipToRef.current(1)
            }
            if (event.data === YT_PLAYING) {
              const length = event.target.getDuration?.()
              if (length) setDuration(length)
            }
          },
          onError: () => onYouTubeError(),
        },
      })
    })

    const timer = window.setInterval(() => {
      if (engineRef.current !== 'youtube') return
      const yt = ytPlayerRef.current
      if (!yt || typeof yt.getCurrentTime !== 'function') return
      try {
        const time = yt.getCurrentTime()
        const length = yt.getDuration()
        if (Number.isFinite(time)) setProgress(time)
        if (Number.isFinite(length) && length > 0) setDuration(length)
      } catch {
        /* ignore */
      }
    }, 250)

    return () => {
      cancelled = true
      window.clearInterval(timer)
      if (ytPlayerRef.current?.destroy) {
        try {
          ytPlayerRef.current.destroy()
        } catch {
          /* ignore */
        }
      }
      ytPlayerRef.current = null
      ytReadyRef.current = false
    }
  }, [onYouTubeError])

  useEffect(() => {
    const song = currentSong
    if (!song) return undefined
    let cancelled = false

    const run = async () => {
      applyVolume()
      const wantYoutube = Boolean(song.youtubeId) && !usingFallbackRef.current

      if (wantYoutube) {
        audioRef.current?.pause()
        engineRef.current = 'youtube'
        try {
          await loadYouTubeApi()
          if (cancelled) return
          const yt = await waitForYouTube()
          if (cancelled) return
          if (!yt || typeof yt.loadVideoById !== 'function') {
            usingFallbackRef.current = true
            await playPreview(song, isPlaying)
            return
          }
          if (loadedIdRef.current !== `${song.id}-youtube`) {
            loadedIdRef.current = `${song.id}-youtube`
            setProgress(0)
            setDuration(song.duration || 0)
            if (isPlaying) yt.loadVideoById({ videoId: song.youtubeId, startSeconds: 0 })
            else yt.cueVideoById({ videoId: song.youtubeId, startSeconds: 0 })
          } else if (isPlaying) {
            yt.playVideo()
          } else {
            yt.pauseVideo()
          }
          applyVolume()
        } catch {
          if (!cancelled) {
            usingFallbackRef.current = true
            await playPreview(song, isPlaying)
          }
        }
        return
      }

      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try {
          ytPlayerRef.current.pauseVideo()
        } catch {
          /* ignore */
        }
      }
      await playPreview(song, isPlaying)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [currentSong, isPlaying, applyVolume, playPreview, waitForYouTube])

  const playAt = useCallback((song, list = allSongs, autoplay = true) => {
    if (!song) return
    const nextQueue = buildQueue(song, list)
    loadedIdRef.current = null
    usingFallbackRef.current = false
    setQueue(nextQueue)
    setCurrentSong(song)
    setProgress(0)
    setDuration(song.duration || 0)
    setIsPlaying(autoplay)
  }, [])

  const seek = useCallback((time) => {
    const nextTime = Math.max(0, time)
    if (engineRef.current === 'youtube') {
      const yt = ytPlayerRef.current
      if (yt && typeof yt.seekTo === 'function') yt.seekTo(nextTime, true)
    } else if (audioRef.current && Number.isFinite(nextTime)) {
      audioRef.current.currentTime = nextTime
    }
    setProgress(nextTime)
  }, [])

  const toggleLike = useCallback((id) => {
    setLikedIds((ids) => (ids.includes(id) ? ids.filter((item) => item.id !== id) : [...ids, id]))
  }, [])

  const value = useMemo(
    () => ({
      currentSong,
      queue,
      isPlaying,
      progress,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      likedIds,
      sidebarOpen,
      setSidebarOpen,
      setVolume,
      setMuted,
      setIsPlaying,
      playAt,
      seek,
      playPause: () => setIsPlaying((value) => !value),
      next: () => skipTo(1),
      prev: () => {
        if (progress > 3) {
          seek(0)
          if (!isPlaying) setIsPlaying(true)
          return
        }
        skipTo(-1)
      },
      toggleShuffle: () => setShuffle((value) => !value),
      cycleRepeat: () => setRepeat((mode) => nextRepeat(mode)),
      toggleLike,
      isLiked: (id) => likedIds.includes(id),
    }),
    [
      currentSong,
      queue,
      isPlaying,
      progress,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      likedIds,
      sidebarOpen,
      playAt,
      seek,
      skipTo,
      toggleLike,
    ],
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <div className="fixed bottom-24 left-0 z-[-1] h-[200px] w-[200px] overflow-hidden opacity-[0.02]" aria-hidden="true">
        <div id="yt-audio-engine" />
      </div>
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used within PlayerProvider')
  return context
}
