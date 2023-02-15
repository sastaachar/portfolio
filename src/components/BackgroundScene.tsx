import {
  OrbitControls,
  PointMaterial,
  Points,
  Stats,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  FC,
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as random from "maath/random";

import * as THREE from "three";
import {
  getRandomVector3,
  getRandRange,
  UtilsRange,
} from "@/utils/vectorUtils";

import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  PointLightHelper,
  Vector3,
} from "three";
import { Theme, themeContext } from "@/context/AppContexts";
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
  const light = useRef(null);

  // useHelper(
  //   light as unknown as MutableRefObject<THREE.Object3D<Event>>,
  //   DirectionalLightHelper
  // );

  const [theme, _] = useContext(themeContext);

  // console.log(theme);

  // lights not need if using basic material

  return (
    <>
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} />
      {/* <axesHelper /> */}
      {/* <directionalLight
        ref={light}
        position={[-2, 0, 0]}
        intensity={1}
        scale={3}
        castShadow
      /> */}
      {/* <Boids /> */}
      {/* <Stats /> */}
      <Stars color={theme === "dark" ? "#faf8ff" : "#00754b"} />
    </>
  );
};

export default BackgroundScene;
