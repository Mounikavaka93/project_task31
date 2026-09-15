import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Gramophone from './Gramophone'
import { createIntroTheme } from '../../lib/introAudio'

const LETTERS = 'Spotify'.split('')

export default function IntroSplash({ children }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [exiting, setExiting] = useState(false)
  const themeRef = useRef(null)
  const doneRef = useRef(false)
  const startedRef = useRef(false)

  const stopTheme = () => {
    themeRef.current?.fadeOut?.(400)
    window.setTimeout(() => {
      themeRef.current?.stop?.()
      themeRef.current = null
    }, 450)
  }

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    setExiting(true)
    stopTheme()
    window.setTimeout(() => setOpen(false), 720)
  }

  const startTheme = () => {
    if (themeRef.current) return
    try {
      const theme = createIntroTheme()
      themeRef.current = theme
      void theme.play().catch(() => {})
    } catch {
      themeRef.current = null
    }
  }

  const enter = () => {
    if (doneRef.current || startedRef.current) return
    startedRef.current = true
    setPlaying(true)
    startTheme()
    window.setTimeout(finish, 650)
  }

  const skip = () => {
    startedRef.current = true
    finish()
  }

  useEffect(() => {
    if (!reduce) return undefined
    const id = window.setTimeout(() => setOpen(false), 200)
    return () => window.clearTimeout(id)
  }, [reduce])

  useEffect(() => {
    return () => {
      themeRef.current?.stop?.()
      themeRef.current = null
    }
  }, [])

  return (
    <div className="h-full">
      <div className="h-full" inert={open || undefined} aria-hidden={open}>
        {children}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.section
            key="intro"
            className="fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#050505] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onPointerDown={(event) => {
              if (event.target.closest('[data-intro-skip]')) return
              enter()
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(29,185,84,0.2),transparent_44%)]" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(720px circle at 50% 82%, rgba(201,162,39,0.14), transparent_52%)',
              }}
            />

            <button
              type="button"
              data-intro-skip
              className="absolute top-5 right-5 z-20 rounded-full px-4 py-2 text-xs font-bold tracking-widest text-white/80 uppercase hover:text-white"
              onPointerDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
                skip()
              }}
            >
              Skip
            </button>

            <div className="pointer-events-none relative flex flex-col items-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 28 }}
                animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.06 : 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <Gramophone playing={playing} />

                {playing
                  ? [0, 1, 2].map((index) => (
                      <motion.span
                        key={index}
                        className="absolute top-10 left-[16%] text-2xl text-spotify"
                        initial={{ opacity: 0, x: 0, y: 16 }}
                        animate={{ opacity: [0, 1, 0], x: [-8, -52], y: [8, -78] }}
                        transition={{ duration: 2.1, delay: index * 0.35, repeat: Infinity }}
                      >
                        ♪
                      </motion.span>
                    ))
                  : null}

                <div className="mt-5 flex items-end gap-3">
                  <motion.svg
                    viewBox="0 0 32 32"
                    className="h-10 w-10 md:h-12 md:w-12"
                    initial={{ scale: 0, rotate: -24 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.35 }}
                  >
                    <circle cx="16" cy="16" r="16" fill="#1DB954" />
                    <path d="M8.2 12.6c5.4-1.6 11.4-1 16.8 1.6" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M8.8 16.5c4.6-1.3 9.7-0.8 14.3 1.4" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9.4 20.2c3.8-1.1 8-0.7 11.7 1.1" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
                  </motion.svg>
                  <h1 className="flex overflow-hidden text-4xl font-extrabold tracking-tight md:text-6xl" aria-label="Spotify">
                    {LETTERS.map((letter, index) => (
                      <motion.span
                        key={letter + index}
                        className="inline-block"
                        initial={{ y: '110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.45 + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </h1>
                </div>
                <p className="mt-3 text-sm tracking-[0.3em] text-white/55 uppercase">Listen to the moment</p>
              </motion.div>
            </div>

            <motion.button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault()
                enter()
              }}
              disabled={playing || exiting}
              className="relative z-20 mt-8 rounded-full bg-spotify px-10 py-3 text-sm font-extrabold tracking-wide text-black shadow-lg shadow-black/40 hover:bg-spotify-hover disabled:opacity-80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.96 }}
            >
              {playing ? 'Entering…' : 'Enter'}
            </motion.button>

            <AnimatePresence>
              {exiting ? (
                <motion.span
                  className="pointer-events-none absolute inset-0 z-30 bg-spotify"
                  initial={{ clipPath: 'circle(0% at 50% 48%)' }}
                  animate={{ clipPath: 'circle(150% at 50% 48%)' }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
            </AnimatePresence>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
