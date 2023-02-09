import { Dispatch, SetStateAction, createContext } from "react";

export type Theme = "light" | "dark";
export type Section = "project" | "about" | "contact" | "intro";

type ThemeContext = [
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>> | null
];

export const ThemeContext = createContext<ThemeContext>(["light", null]);
