import Head from "next/head";
import {
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Theme, ThemeContext } from "@/context/ThemeContext";
import { text } from "stream/consumers";
import WriteAnimationText from "@/components/WriteAnimationText";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Portfolio for Justin John Mathew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContext.Provider value={[theme, setTheme]}>
        <div className="container" data-theme={theme}>
          <ThemButton />
          <Navbar />

          <div className="intro">
            <div className="intro-left">
              <div className="intro-left-wrapper">
                <div className="hello-world">
                  <WriteAnimationText
                    values={["Hello World ! ", "Hola amigo ! ", "12321 "]}
                  />
                </div>
                <div className="intro-bio">
                  My name is Justin hehe awd awd ad sa dasd as das asd ad w dawd
                  aw daw awdawd aw
                </div>
              </div>
            </div>
            <div className="intro-right">
              <div className="big-ball" />
            </div>
          </div>
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

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-name">
          <span>Justin Mathew</span>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-link">
          <span>Projects</span>
        </div>
        <div className="navbar-link">
          <span>About</span>
        </div>
        <div className="navbar-link">
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
};
