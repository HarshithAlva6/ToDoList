import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue: '#1E6F9F',
        textBlue: '#4EA8DE',
        tasksColor: '#4EA8DE',
        completedColor: '#8284FA',
        app: '#5E60CE'
      },
      backgroundImage: {
        'custom-backdrop': 'linear-gradient(to bottom, #0D0D0D var(--button-midpoint), transparent var(--button-midpoint))',
      },
    },
  },
  plugins: [],
} satisfies Config;
