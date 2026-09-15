const NOTE = {
  C3: 130.81,
  E3: 164.81,
  G3: 196.0,
  A3: 220.0,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  G4: 392.0,
  A4: 440.0,
  C5: 523.25,
}

function makeCrackle(ctx, seconds = 2.5) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i += 1) {
    const hiss = (Math.random() * 2 - 1) * 0.08
    const pop = Math.random() > 0.997 ? (Math.random() * 2 - 1) * 0.35 : 0
    data[i] = hiss + pop
  }
  return buffer
}

function playTone(ctx, destination, { start, frequency, duration, volume = 0.11 }) {
  const osc = ctx.createOscillator()
  const harmonic = ctx.createOscillator()
  const gain = ctx.createGain()
  const harmGain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(frequency, start)
  harmonic.type = 'sine'
  harmonic.frequency.setValueAtTime(frequency * 2, start)
  harmGain.gain.value = 0.16
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(1700, start)

  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.07)
  gain.gain.exponentialRampToValueAtTime(volume * 0.5, start + duration * 0.5)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  osc.connect(filter)
  harmonic.connect(harmGain).connect(filter)
  filter.connect(gain).connect(destination)

  osc.start(start)
  harmonic.start(start)
  osc.stop(start + duration + 0.04)
  harmonic.stop(start + duration + 0.04)
}

export function createIntroTheme() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  const ctx = new AudioCtx()
  const master = ctx.createGain()
  master.gain.value = 0.85
  master.connect(ctx.destination)

  const nodes = []

  const play = async () => {
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
    if (ctx.state !== 'running') return
    const now = ctx.currentTime + 0.02

    const crackle = ctx.createBufferSource()
    crackle.buffer = makeCrackle(ctx, 7)
    crackle.loop = true
    const crackleFilter = ctx.createBiquadFilter()
    crackleFilter.type = 'highpass'
    crackleFilter.frequency.value = 900
    const crackleGain = ctx.createGain()
    crackleGain.gain.setValueAtTime(0.0001, now)
    crackleGain.gain.exponentialRampToValueAtTime(0.045, now + 0.7)
    crackleGain.gain.setValueAtTime(0.045, now + 4.4)
    crackleGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.6)
    crackle.connect(crackleFilter).connect(crackleGain).connect(master)
    crackle.start(now)
    crackle.stop(now + 5.8)
    nodes.push(crackle)

    const pad = ctx.createOscillator()
    pad.type = 'sine'
    pad.frequency.setValueAtTime(NOTE.G3, now)
    const pad2 = ctx.createOscillator()
    pad2.type = 'sine'
    pad2.frequency.setValueAtTime(NOTE.C3, now)
    const padGain = ctx.createGain()
    padGain.gain.setValueAtTime(0.0001, now)
    padGain.gain.exponentialRampToValueAtTime(0.07, now + 1.1)
    padGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5)
    const padFilter = ctx.createBiquadFilter()
    padFilter.type = 'lowpass'
    padFilter.frequency.value = 640
    pad.connect(padFilter)
    pad2.connect(padFilter)
    padFilter.connect(padGain).connect(master)
    pad.start(now)
    pad2.start(now)
    pad.stop(now + 5.6)
    pad2.stop(now + 5.6)
    nodes.push(pad, pad2)

    const melody = [
      { t: 0.55, f: NOTE.G3, d: 0.7, v: 0.1 },
      { t: 1.15, f: NOTE.C4, d: 0.55, v: 0.12 },
      { t: 1.65, f: NOTE.E4, d: 0.5, v: 0.12 },
      { t: 2.1, f: NOTE.G4, d: 0.75, v: 0.13 },
      { t: 2.8, f: NOTE.A4, d: 0.4, v: 0.1 },
      { t: 3.15, f: NOTE.G4, d: 0.45, v: 0.12 },
      { t: 3.55, f: NOTE.E4, d: 0.5, v: 0.11 },
      { t: 4.05, f: NOTE.C5, d: 0.9, v: 0.14 },
    ]

    melody.forEach((note) => {
      playTone(ctx, master, {
        start: now + note.t,
        frequency: note.f,
        duration: note.d,
        volume: note.v,
      })
    })
  }

  const fadeOut = (ms = 600) => {
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now)
    master.gain.exponentialRampToValueAtTime(0.0001, now + ms / 1000)
  }

  const stop = async () => {
    try {
      fadeOut(180)
      await new Promise((resolve) => window.setTimeout(resolve, 220))
      nodes.forEach((node) => {
        try {
          node.stop()
        } catch {
          /* already stopped */
        }
      })
      if (ctx.state !== 'closed') await ctx.close()
    } catch {
      /* ignore */
    }
  }

  return { ctx, play, fadeOut, stop }
}
