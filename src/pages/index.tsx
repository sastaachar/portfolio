import Head from "next/head";
import { MutableRefObject, useContext, useRef, useState } from "react";
import { Theme, themeContext } from "@/context/AppContexts";
import BackgroundScene from "@/components/BackgroundScene";
import Sections from "@/components/sections/Sections";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");

  const containerRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;

  console.log("Home renders");

  return (
    <>
      <Head>
        <title>Justin Mathew&apos;s portfolio</title>
        <meta name="description" content="Portfolio for Justin John Mathew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <themeContext.Provider value={[theme, setTheme]}>
        <div className="outer-container" data-theme={theme} ref={containerRef}>
          <div className="container">
            <ThemButton />
            <Sections />
          </div>
          <BackgroundScene parentRef={containerRef} />
        </div>
      </themeContext.Provider>
    </>
  );
}

const ThemButton = () => {
  const [theme, setTheme] = useContext(themeContext);
  console.log("theme button render");
  return (
    <div
      className="theme-button"
      onClick={() => {
        if (setTheme) setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
};
