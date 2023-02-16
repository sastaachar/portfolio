import Head from "next/head";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Theme, themeContext } from "@/context/AppContexts";
import BackgroundScene from "@/components/BackgroundScene";
import Sections from "@/components/sections/Sections";
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}
export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");

  const containerRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;

  console.log("Home renders");

  // useEffect(() => {});

  const test = () => {
    const requestPermission = (
      DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
    ).requestPermission;

    const iOS = typeof requestPermission === "function";

    if (iOS) {
      requestPermission()
        .then((response) => {
          if (response == "granted") {
            window.addEventListener("devicemotion", (event) => {
              const acceleration = event.accelerationIncludingGravity;
              const rotationRate = event.rotationRate;
              if (
                !rotationRate?.alpha ||
                !rotationRate.beta ||
                !rotationRate.gamma
              )
                return;
              alert("YOU HAVE BEEN HACKED !");
              // Use the gyroscope data here
            });
          }
        })
        .catch();
    }
  };

  return (
    <>
      <Head>
        <title>Justin Mathew&apos;s portfolio</title>
        <meta name="description" content="Portfolio for Justin John Mathew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <themeContext.Provider value={[theme, setTheme]}>
        <button onClick={test}>click me</button>
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
