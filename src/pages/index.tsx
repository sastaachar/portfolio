import Head from "next/head";
import {
  Dispatch,
  FC,
  MutableRefObject,
  RefObject,
  SetStateAction,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Section, Theme, ThemeContext } from "@/context/AppContexts";
import WriteAnimationText from "@/components/WriteAnimationText";
import BackgroundScene from "@/components/BackgroundScene";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { DivRef } from "@/constants";
import ProjectSection from "@/components/sections/ProjectSection";
import Sections from "@/components/sections/Sections";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [section, setSection] = useState<Section>("intro");

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;

  return (
    <>
      <Head>
        <title>Justin Mathew&apos;s portfolio</title>
        <meta name="description" content="Portfolio for Justin John Mathew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContext.Provider value={[theme, setTheme]}>
        <div className="outer-container" data-theme={theme} ref={containerRef}>
          <div className="container">
            <ThemButton />
            <Navbar
              introRef={introRef}
              projectRef={projectRef}
              aboutRef={aboutRef}
              contactRef={contactRef}
              section={section}
            />
            <Sections
              introRef={introRef}
              projectRef={projectRef}
              contactRef={contactRef}
              aboutRef={aboutRef}
              setSection={setSection}
            />
          </div>
          <BackgroundScene parentRef={containerRef} />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

const ThemButton = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className="theme-button"
      onClick={() => {
        if (setTheme) setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
};
