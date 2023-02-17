import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MutableRefObject, useContext } from "react";

import { themeContext } from "@/context/AppContexts";
import Stars from "./Stars";
import Boids from "./boids/Boids";

const BackgroundScene = ({
  parentRef,
}: {
  parentRef: MutableRefObject<HTMLElement>;
}) => {
  return (
    <div className="three-canvas">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 55 }}
        eventSource={parentRef}
        eventPrefix="page"
        shadows="soft"
      >
        <Scene />
      </Canvas>
    </div>
  );
};

const Scene = () => {
  const [theme, _] = useContext(themeContext);

  // lights not need if using basic material

  return (
    <>
      {/* <ambientLight intensity={0.5} /> */}
      <OrbitControls enableZoom={false} />
      {/* <axesHelper /> */}
      {/* <directionalLight
        ref={light}
        position={[-2, 0, 0]}
        intensity={1}
        scale={3}
        castShadow
      /> */}
      <Boids />
      {/* <Stats /> */}
      <Stars color={theme === "dark" ? "#faf8ff" : "#00754b"} />
    </>
  );
};

export default BackgroundScene;
