const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const Arrow = ({ size = 16, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ size = 14, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export const Chart = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 4 3 5-7" />
  </svg>
);

export const Doc = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const Mail = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const Mic = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0014 0M12 18v3" />
  </svg>
);

export const Brain = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M8 3a3 3 0 013 3v12a3 3 0 01-6 0 3 3 0 01-2-3 3 3 0 010-4 3 3 0 012-3 3 3 0 013-5z" />
    <path d="M16 3a3 3 0 00-3 3v12a3 3 0 006 0 3 3 0 002-3 3 3 0 000-4 3 3 0 00-2-3 3 3 0 00-3-5z" />
  </svg>
);

export const Grid = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const User = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0116 0" />
  </svg>
);

export const Target = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);

export const Trend = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M3 17l6-6 4 4 8-9" />
    <path d="M14 6h7v7" />
  </svg>
);

export const Menu = ({ size = 22, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ size = 22, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6l-12 12" />
  </svg>
);

export const Plus = ({ size = 16, ...p }) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M5 12h14" /></svg>
);

export const Minus = ({ size = 16, ...p }) => (
  <svg {...base(size)} {...p}><path d="M5 12h14" /></svg>
);

export const Sparkles = ({ size = 16, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
    <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
  </svg>
);

export const Refresh = ({ size = 16, ...p }) => (
  <svg {...base(size)} {...p}>
    <path d="M20 12a8 8 0 10-2.34 5.66L20 20" />
    <path d="M20 14v-6h-6" />
  </svg>
);

export const Play = ({ size = 14, ...p }) => (
  <svg {...base(size)} {...p}><path d="M6 4l14 8-14 8V4z" fill="currentColor" /></svg>
);
