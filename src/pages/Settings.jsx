import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [quality, setQuality] = useState('very-high')
  const [normalize, setNormalize] = useState(true)
  const [saved, setSaved] = useState(false)

  const save = (event) => {
    event.preventDefault()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <h1 className="mb-6 text-3xl font-extrabold">Settings</h1>

      <form onSubmit={save} className="space-y-8">
        <section className="rounded-lg bg-elevated p-5">
          <h2 className="mb-4 text-lg font-bold">Account</h2>
          <label className="mb-3 block text-sm text-muted">
            Display name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded bg-highlight px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white"
            />
          </label>
          <label className="block text-sm text-muted">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded bg-highlight px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white"
            />
          </label>
        </section>

        <section className="rounded-lg bg-elevated p-5">
          <h2 className="mb-4 text-lg font-bold">Playback</h2>
          <label className="mb-3 block text-sm text-muted">
            Audio quality
            <select
              value={quality}
              onChange={(event) => setQuality(event.target.value)}
              className="mt-1 w-full rounded bg-highlight px-3 py-2 text-white outline-none"
            >
              <option value="auto">Automatic</option>
              <option value="high">High</option>
              <option value="very-high">Very high</option>
            </select>
          </label>
          <label className="flex items-center justify-between gap-4 text-sm">
            Normalize volume
            <input
              type="checkbox"
              checked={normalize}
              onChange={(event) => setNormalize(event.target.checked)}
              className="h-4 w-4 accent-spotify"
            />
          </label>
        </section>

        <button type="submit" className="rounded-full bg-spotify px-6 py-2.5 text-sm font-bold text-black hover:scale-105">
          {saved ? 'Saved' : 'Save settings'}
        </button>
      </form>
    </div>
  )
}
