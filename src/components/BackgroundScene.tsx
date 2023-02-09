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
import { Theme, ThemeContext } from "@/context/AppContexts";
import { useControls } from "leva";
import Stars from "./Stars";
import Boids from "./Boids";

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

  useHelper(
    light as unknown as MutableRefObject<THREE.Object3D<Event>>,
    DirectionalLightHelper
  );

  const [theme, _] = useContext(ThemeContext);

  console.log(theme);

  return (
    <>
      <ambientLight intensity={0.1} />
      <OrbitControls enableZoom={false} />
      {/* <axesHelper />
      <OrbitControls enableZoom={true} />
     
      <directionalLight ref={light} position={[0, 1, 0.6]} castShadow />

      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, -0.5, 0]}
        rotation-x={Math.PI * 0.5}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
      <Boids />
      <Stats /> */}
      <Stars color={theme === "dark" ? "#faf8ff" : "#00754b"} />
    </>
  );
};

export default BackgroundScene;
