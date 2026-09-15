import { useState } from 'react'
import { Check, Crown } from 'lucide-react'
import { motion } from 'motion/react'
import { premiumPlans } from '../data/accountData'
import AmbientOrbs from '../components/motion/AmbientOrbs'
import AnimatedText from '../components/motion/AnimatedText'
import Magnetic from '../components/motion/Magnetic'

export default function Premium() {
  const [selected, setSelected] = useState('individual')
  const [joined, setJoined] = useState(() => localStorage.getItem('spotify-premium') === '1')

  const startPlan = (id) => {
    setSelected(id)
    localStorage.setItem('spotify-premium', '1')
    setJoined(true)
  }

  return (
    <div className="pb-8">
      <section className="relative -mx-5 mb-8 overflow-hidden bg-gradient-to-br from-[#1e3264] via-[#535353] to-black px-5 py-10 md:px-10 md:py-14">
        <AmbientOrbs />
        <motion.div
          initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        >
          <Crown className="mb-4 h-10 w-10 text-spotify" />
        </motion.div>
        <p className="text-sm font-bold tracking-wide text-white/80 uppercase">Spotify Premium</p>
        <AnimatedText
          text="Listen without limits."
          as="h1"
          className="mt-2 max-w-xl text-4xl font-extrabold tracking-tight md:text-6xl"
        />
        <p className="mt-4 max-w-lg text-white/80">
          Ad-free Tollywood hits, play any song, and download for offline. This is a demo checkout — no payment is taken.
        </p>
        {joined ? (
          <p className="mt-6 inline-flex rounded-full bg-spotify px-5 py-2 text-sm font-bold text-black">
            Premium is on for this demo
          </p>
        ) : (
          <Magnetic>
            <motion.button
              type="button"
              onClick={() => startPlan(selected)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-bold text-black"
            >
              Get Premium
            </motion.button>
          </Magnetic>
        )}
      </section>

      <h2 className="mb-4 text-2xl font-bold">Choose your plan</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {premiumPlans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            className={`rounded-xl border p-5 text-left transition ${
              selected === plan.id ? 'border-spotify bg-white/8' : 'border-white/10 bg-elevated'
            }`}
          >
            <p className="text-lg font-extrabold">{plan.name}</p>
            <p className="mt-1 text-2xl font-bold">
              {plan.price}
              <span className="text-sm font-medium text-muted"> / {plan.period}</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-spotify" />
                  {perk}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`mt-5 rounded-full px-4 py-2 text-sm font-bold ${
                joined && selected === plan.id ? 'bg-spotify text-black' : 'bg-white text-black hover:scale-105'
              }`}
              onClick={() => startPlan(plan.id)}
            >
              {joined && selected === plan.id ? 'Current plan' : `Get ${plan.name}`}
            </button>
            </motion.div>
        ))}
      </div>
    </div>
  )
}
