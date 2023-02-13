import { Dispatch, SetStateAction, createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContext = [
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>> | null
];

export const themeContext = createContext<ThemeContext>(["light", null]);
