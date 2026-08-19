/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-high": "#dee8ff",
        "on-tertiary": "#ffffff",
        "surface-variant": "#d8e3fb",
        "tertiary-fixed-dim": "#b7c8e1",
        "on-background": "#111c2d",
        "on-secondary": "#ffffff",
        "surface-container": "#e7eeff",
        "inverse-on-surface": "#ecf1ff",
        "error": "#ba1a1a",
        "on-surface-variant": "#45464d",
        "on-tertiary-container": "#75859d",
        "secondary-fixed-dim": "#c4c7c9",
        "primary-fixed": "#dae2fd",
        "secondary": "#5c5f61",
        "primary-container": "#131b2e",
        "surface-tint": "#565e74",
        "on-error": "#ffffff",
        "inverse-surface": "#263143",
        "outline-variant": "#c6c6cd",
        "tertiary-fixed": "#d3e4fe",
        "secondary-fixed": "#e0e3e5",
        "tertiary-container": "#0b1c30",
        "on-primary-fixed": "#131b2e",
        "inverse-primary": "#bec6e0",
        "primary-fixed-dim": "#bec6e0",
        "on-primary": "#ffffff",
        "on-secondary-container": "#626567",
        "surface-dim": "#cfdaf2",
        "on-primary-fixed-variant": "#3f465c",
        "surface-bright": "#f9f9ff",
        "on-error-container": "#93000a",
        "surface-container-low": "#f0f3ff",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#38485d",
        "surface-container-highest": "#d8e3fb",
        "primary": "#000000",
        "on-tertiary-fixed": "#0b1c30",
        "surface": "#f9f9ff",
        "background": "#f9f9ff",
        "outline": "#76777d",
        "on-secondary-fixed": "#191c1e",
        "on-surface": "#111c2d",
        "on-secondary-fixed-variant": "#444749",
        "secondary-container": "#e0e3e5",
        "surface-container-lowest": "#ffffff",
        "tertiary": "#000000",
        "on-primary-container": "#7c839b",
        "brand-gold": "#DA8B1D"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter": "24px",
        "sm": "8px",
        "base": "4px",
        "xs": "4px",
        "container-max": "1280px",
        "md": "16px",
        "xl": "40px",
        "2xl": "64px",
        "lg": "24px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "display": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "display": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}
