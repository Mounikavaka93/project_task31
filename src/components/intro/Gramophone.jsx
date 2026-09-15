export default function Gramophone({ playing }) {
  return (
    <svg viewBox="0 0 420 420" className="h-[min(52vw,280px)] w-[min(52vw,280px)] md:h-[340px] md:w-[340px]" aria-hidden="true">
      <defs>
        <linearGradient id="horn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6d365" />
          <stop offset="45%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#7a5410" />
        </linearGradient>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b3f24" />
          <stop offset="100%" stopColor="#2b160c" />
        </linearGradient>
        <radialGradient id="label" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1ed760" />
          <stop offset="100%" stopColor="#14833b" />
        </radialGradient>
      </defs>

      <ellipse cx="210" cy="396" rx="120" ry="14" fill="#000" opacity="0.38" />

      <rect x="118" y="248" width="184" height="92" rx="10" fill="url(#wood)" />
      <rect x="128" y="256" width="164" height="10" rx="4" fill="#8a542e" opacity="0.5" />
      <circle cx="210" cy="286" r="64" fill="#1a1a1a" />

      <g className={playing ? 'gramophone-record' : ''} style={{ transformOrigin: '210px 286px' }}>
        <circle cx="210" cy="286" r="54" fill="#0b0b0b" />
        {[18, 26, 34, 42, 48].map((r) => (
          <circle key={r} cx="210" cy="286" r={r} fill="none" stroke="#2f2f2f" strokeWidth="1.15" />
        ))}
        <circle cx="210" cy="286" r="16" fill="url(#label)" />
        <path
          d="M204 280c2.2-1.5 7.2-1 10.4 1"
          fill="none"
          stroke="#0b0b0b"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="210" cy="286" r="4" fill="#0b0b0b" />
      </g>

      <g className={playing ? 'gramophone-arm' : 'gramophone-arm-rest'}>
        <rect x="262" y="248" width="58" height="7" rx="3" fill="#c5c5c5" />
        <rect x="312" y="246" width="8" height="28" rx="2" fill="#ececec" />
        <circle cx="316" cy="278" r="6" fill="#1db954" />
      </g>

      <path
        d="M168 236 C 92 210, 48 150, 58 92 C 66 48, 118 28, 168 46 C 214 62, 228 112, 206 154 C 188 186, 168 208, 168 236 Z"
        fill="url(#horn)"
      />
      <ellipse cx="112" cy="78" rx="58" ry="42" fill="none" stroke="#f3e2a5" strokeWidth="6" opacity="0.9" />
      <ellipse cx="112" cy="78" rx="42" ry="28" fill="#1a1208" opacity="0.32" />
      <rect x="162" y="226" width="18" height="24" rx="4" fill="#d4b45a" />
    </svg>
  )
}
