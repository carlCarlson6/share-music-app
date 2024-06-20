import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui"
import tailwindTypegraphy from "@tailwindcss/typography"


export default {
  content: [
    "./src/**/*.tsx", 
    'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [
    tailwindTypegraphy,
    daisyui,
    require('preline/plugin')
  ],
  daisyui: {
    themes: []
  }
} satisfies Config;
