import { Dispatch, SetStateAction, createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextType = [
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>> | null
];

export const ThemeContext = createContext<ThemeContextType>(["light", null]);
