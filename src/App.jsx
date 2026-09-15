import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Playlist from './pages/Playlist'
import Artist from './pages/Artist'
import Album from './pages/Album'
import Library from './pages/Library'
import Liked from './pages/Liked'
import Premium from './pages/Premium'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import IntroSplash from './components/intro/IntroSplash'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <PlayerProvider>
          <IntroSplash>
            <BrowserRouter>
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/library" element={<Library />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              </Routes>
            </BrowserRouter>
          </IntroSplash>
        </PlayerProvider>
      </AuthProvider>
    </MotionConfig>
  )
}
