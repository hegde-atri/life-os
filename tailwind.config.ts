import { nextui } from "@nextui-org/react";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#eeeffc",
            foreground: "#02030d",
            primary: {
              DEFAULT: "#3b1674",
              foreground: "#eeeffc",
            },
            secondary: {
              DEFAULT: "#e1cefd",
              foreground: "#02030d",
            },
            success: {
              DEFAULT: "#BBECBE",
              foreground: "#02030d",
            },
            danger: {
              DEFAULT: "#F39CA8",
              foreground: "#02030d",
            },
            focus: "#3b1674",
          },
        },
        dark: {
          colors: {
            background: "#030411",
            foreground: "#f2f3fd",
            primary: {
              DEFAULT: "#b18be9",
              foreground: "#030411",
            },
            secondary: {
              DEFAULT: "#150231",
              foreground: "#f2f3fd",
            },
            success: {
              DEFAULT: "#bbecbe",
              foreground: "#030411",
            },
            danger: {
              DEFAULT: "#f39ca8",
              foreground: "#030411",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
