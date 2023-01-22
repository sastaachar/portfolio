import "@/styles/globals.scss";
import "@/styles/reset.css";

import { useState } from "react";

import type { AppProps } from "next/app";

type Theme = "light" | "dark";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Theme>("light");

  return <Component {...pageProps} />;
}
