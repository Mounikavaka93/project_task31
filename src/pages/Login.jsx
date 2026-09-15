import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { demoAccount, useAuth } from '../context/AuthContext'
import AmbientOrbs from '../components/motion/AmbientOrbs'
import AnimatedText from '../components/motion/AnimatedText'
import Magnetic from '../components/motion/Magnetic'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/

function validateLogin(values) {
  const errors = {}
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.password) errors.password = 'Password is required.'
  else if (values.password.length < 8) errors.password = 'Password must be at least 8 characters.'
  return errors
}

function validateSignup(values) {
  const errors = validateLogin(values)
  if (!values.name.trim()) errors.name = 'Full name is required.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (!/^[a-zA-Z][a-zA-Z .'-]*$/.test(values.name.trim())) errors.name = 'Use letters only in your name.'
  if (values.password && !passwordPattern.test(values.password)) {
    errors.password = 'Use 8+ characters with upper, lower, number, and symbol.'
  }
  if (!values.confirm) errors.confirm = 'Confirm your password.'
  else if (values.confirm !== values.password) errors.confirm = 'Passwords do not match.'
  return errors
}

export default function Login() {
  const { isLoggedIn, login, signup } = useAuth()
  const location = useLocation()
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })

  if (isLoggedIn) {
    const to = location.state?.from?.pathname || '/'
    return <Navigate to={to} replace />
  }

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = mode === 'login' ? validateLogin(values) : validateSignup(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const result =
      mode === 'login'
        ? login(values.email, values.password)
        : signup({ name: values.name, email: values.email, password: values.password })

    if (!result.ok) setFormError(result.message)
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black px-5 py-10 text-white">
      <AmbientOrbs />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="relative w-full max-w-md rounded-2xl bg-[#121212]/90 p-8 shadow-2xl ring-1 ring-white/8 backdrop-blur-md"
      >
        <div className="mb-8 flex items-center gap-3">
          <motion.svg
            viewBox="0 0 32 32"
            className="h-10 w-10 shrink-0"
            aria-hidden="true"
            animate={{ rotate: [0, 8, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="16" cy="16" r="16" fill="#1DB954" />
            <path d="M8.2 12.6c5.4-1.6 11.4-1 16.8 1.6" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M8.8 16.5c4.6-1.3 9.7-0.8 14.3 1.4" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <path d="M9.4 20.2c3.8-1.1 8-0.7 11.7 1.1" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
          </motion.svg>
          <AnimatedText
            text={mode === 'login' ? 'Log in to Spotify' : 'Create an account'}
            className="text-2xl font-extrabold"
            as="h1"
          />
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-full bg-white/8 p-1">
          {['login', 'signup'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setMode(item)
                setErrors({})
                setFormError('')
              }}
              className={`relative rounded-full py-2 text-sm font-bold ${mode === item ? 'text-black' : 'text-muted'}`}
            >
              {mode === item ? (
                <motion.span
                  layoutId="auth-tab"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              ) : null}
              <span className="relative z-10">{item === 'login' ? 'Log in' : 'Sign up'}</span>
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4" noValidate>
          <AnimatePresence initial={false}>
            {mode === 'signup' ? (
              <motion.label
                key="name"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="block overflow-hidden text-sm font-bold"
              >
                Full name
                <input
                  value={values.name}
                  onChange={update('name')}
                  autoComplete="name"
                  className="mt-2 w-full rounded bg-[#242424] px-3 py-3 font-medium outline-none focus:ring-2 focus:ring-white"
                  placeholder="Mounika Vaka"
                />
                {errors.name ? <p className="mt-1 text-xs font-medium text-red-400">{errors.name}</p> : null}
              </motion.label>
            ) : null}
          </AnimatePresence>

          <label className="block text-sm font-bold">
            Email
            <input
              type="email"
              value={values.email}
              onChange={update('email')}
              autoComplete="email"
              className="mt-2 w-full rounded bg-[#242424] px-3 py-3 font-medium outline-none focus:ring-2 focus:ring-white"
              placeholder="name@email.com"
            />
            {errors.email ? <p className="mt-1 text-xs font-medium text-red-400">{errors.email}</p> : null}
          </label>

          <label className="block text-sm font-bold">
            Password
            <span className="relative mt-2 block">
              <input
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={update('password')}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full rounded bg-[#242424] px-3 py-3 pr-12 font-medium outline-none focus:ring-2 focus:ring-white"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-white"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
            {errors.password ? <p className="mt-1 text-xs font-medium text-red-400">{errors.password}</p> : null}
          </label>

          <AnimatePresence initial={false}>
            {mode === 'signup' ? (
              <motion.label
                key="confirm"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="block overflow-hidden text-sm font-bold"
              >
                Confirm password
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={values.confirm}
                  onChange={update('confirm')}
                  autoComplete="new-password"
                  className="mt-2 w-full rounded bg-[#242424] px-3 py-3 font-medium outline-none focus:ring-2 focus:ring-white"
                />
                {errors.confirm ? <p className="mt-1 text-xs font-medium text-red-400">{errors.confirm}</p> : null}
              </motion.label>
            ) : null}
          </AnimatePresence>

          {formError ? <p className="text-sm font-medium text-red-400">{formError}</p> : null}

          <Magnetic className="w-full" strength={0.12}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-spotify py-3 text-sm font-extrabold text-black"
            >
              {mode === 'login' ? 'Log in' : 'Sign up'}
            </motion.button>
          </Magnetic>
        </form>

        <div className="mt-6 rounded-lg bg-white/5 p-4 text-sm text-muted">
          <p className="font-bold text-white">Demo account</p>
          <p className="mt-1">Email: {demoAccount.email}</p>
          <p>Password: {demoAccount.password}</p>
        </div>
      </motion.div>
    </div>
  )
}
