import Head from "next/head";
import { MutableRefObject, useRef, useState } from "react";
import { Theme, ThemeContext } from "@/context/ThemeContext";

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
          <Navbar />
          <div
            className="theme-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

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
