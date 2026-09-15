import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-3 text-muted">This page is not in your library.</p>
      <Link to="/" className="mt-6 rounded-full bg-white px-6 py-2 font-bold text-black hover:scale-105">
        Home
      </Link>
    </div>
  )
}
