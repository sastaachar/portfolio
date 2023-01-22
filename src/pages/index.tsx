import Head from "next/head";
import { MutableRefObject, useRef, useState } from "react";
import ReactContent from "@/components/ReactContent";
import ThreejsContent from "@/components/ThreejsContent";
import { Theme, ThemeContext } from "@/context/ThemeContext";

export default function Home() {
  console.log("home is rendered");

  const value = useState<Theme>("light");

  const container =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Portfolio for Justin John Mathew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container" ref={container}>
        <ThemeContext.Provider value={value}>
          <ReactContent />
          <ThreejsContent container={container} />
        </ThemeContext.Provider>
      </div>
    </>
  );
}
