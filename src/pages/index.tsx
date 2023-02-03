import Head from "next/head";
import {
  FC,
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Theme, ThemeContext } from "@/context/ThemeContext";
import { text } from "stream/consumers";
import WriteAnimationText from "@/components/WriteAnimationText";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");

  const dynamicTextList = ["Hello World ! ", "Hola amigo ! ", "12321 "];

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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
          <Navbar
            projectRef={projectRef}
            aboutRef={aboutRef}
            contactRef={contactRef}
          />
          <div className="sections">
            <div className="intro">
              <div className="intro-left">
                <div className="intro-left-wrapper">
                  <div className="hello-world">
                    <WriteAnimationText values={dynamicTextList} />
                  </div>
                  <div className="intro-bio">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eius dolorum laborum non necessitatibus nam numquam eveniet
                  </div>
                </div>
              </div>
              <div className="intro-right">
                <div className="big-ball" />
              </div>
            </div>

            <div className="projects" ref={projectRef}>
              Project
            </div>
            <div className="about" ref={aboutRef}>
              about
            </div>
            <div className="contact" ref={contactRef}>
              contact
            </div>
          </div>
        </div>
        <Canvas />
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

type NavbarPropType = {
  projectRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLDivElement>;
  contactRef: RefObject<HTMLDivElement>;
};

const Navbar = ({ projectRef, aboutRef, contactRef }: NavbarPropType) => {
  const handleScrollTo = (ref: RefObject<HTMLDivElement>) => {
    return () => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    };
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-name">
          <span>Justin Mathew</span>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-link" onClick={handleScrollTo(projectRef)}>
          <span>Projects</span>
        </div>
        <div className="navbar-link" onClick={handleScrollTo(aboutRef)}>
          <span>About</span>
        </div>
        <div className="navbar-link" onClick={handleScrollTo(contactRef)}>
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
};
