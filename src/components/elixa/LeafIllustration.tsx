type LeafProps = {
  id: string;
  from: string;
  mid: string;
  to: string;
  glow: string;
  variant: "broad" | "succulent" | "serrated" | "narrow" | "lobed";
};

const shapes: Record<LeafProps["variant"], string> = {
  broad:
    "M60 8 C92 24 108 58 96 92 C86 120 68 132 60 148 C52 132 34 120 24 92 C12 58 28 24 60 8 Z",
  succulent:
    "M60 6 C78 34 86 74 78 112 C74 132 66 142 60 152 C54 142 46 132 42 112 C34 74 42 34 60 6 Z",
  serrated:
    "M60 8 C84 20 96 40 98 62 C112 68 104 82 96 88 C100 104 86 118 74 124 C70 138 64 146 60 152 C56 146 50 138 46 124 C34 118 20 104 24 88 C16 82 8 68 22 62 C24 40 36 20 60 8 Z",
  narrow:
    "M60 6 C74 40 80 84 70 122 C66 138 62 146 60 154 C58 146 54 138 50 122 C40 84 46 40 60 6 Z",
  lobed:
    "M60 10 C80 18 88 36 84 52 C102 48 116 62 110 80 C124 92 116 114 98 116 C92 136 72 146 60 152 C48 146 28 136 22 116 C4 114 -4 92 10 80 C4 62 18 48 36 52 C32 36 40 18 60 10 Z",
};

export function LeafIllustration({ id, from, mid, to, glow, variant }: LeafProps) {
  return (
    <svg viewBox="0 0 120 160" className="h-28 w-auto" aria-hidden="true">
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <radialGradient id={`sh-${id}`} cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </radialGradient>
        <filter id={`gl-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={shapes[variant]} fill={glow} opacity="0.35" filter={`url(#gl-${id})`} />
      <path d={shapes[variant]} fill={`url(#lg-${id})`} />
      <path d={shapes[variant]} fill={`url(#sh-${id})`} style={{ mixBlendMode: "soft-light" }} />

      <path
        d="M60 12 C60 60 60 108 60 150"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {[34, 54, 74, 94, 114].map((y, i) => (
        <g key={y} opacity={0.4 - i * 0.03}>
          <path
            d={`M60 ${y} C${60 - 14} ${y + 4} ${60 - 24} ${y + 12} ${60 - 30} ${y + 22}`}
            stroke="#ffffff"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M60 ${y} C${60 + 14} ${y + 4} ${60 + 24} ${y + 12} ${60 + 30} ${y + 22}`}
            stroke="#ffffff"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path
        d="M60 148 C60 154 59 158 58 160"
        stroke={to}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
