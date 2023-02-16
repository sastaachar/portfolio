import {
  getRandomVector3,
  getUnprojectedCords,
  UtilsRange,
} from "@/utils/vectorUtils";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, MutableRefObject, RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import Boid, { BoidProperties } from "./Boid";

const useWidthHeight = (dist: number) => {
  const { camera } = useThree() as { camera: THREE.PerspectiveCamera };

  var vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians

  var height = 2 * Math.tan(vFOV / 2) * (camera.position.z - dist); // visible height

  var width = height * camera.aspect; // visible width

  return { height, width };
};

const Boids = () => {
  const count = 200;

  const pointerStateRef = useRef({
    prevPointer: new THREE.Vector2(0, 0),
    pointerSpeed: new THREE.Vector2(0, 0),
  });

  const gyro = useRef({
    rotation: new Vector3(),
  });

  const { width, height } = useWidthHeight(0);

  const spawnPositionRange = {
    x: { min: width / 4, max: width / 4 + 1 },
    y: { min: 0, max: 1 },
    z: { min: -1, max: 0 },
  };
  const borderPositionRange = {
    x: { min: -width / 2, max: width / 2 },
    y: { min: -height / 2, max: height / 2 },
    z: { min: -4, max: 0 },
  };
  const r = 1;

  const velocityRange = { min: -1, max: 1 };

  const boidsRef = useRef(
    Array<BoidProperties | null>(count)
      .fill(null)
      .map((_, index) => ({
        velocity: getRandomVector3(velocityRange),
        index,
        meshRef: null,
      }))
  );

  useFrame((state, delta) => {
    const pointerState = pointerStateRef.current;

    if (!pointerState || !delta) return;

    const prev = pointerState.prevPointer;
    pointerState.pointerSpeed.setX((prev.x - state.pointer.x) / delta);
    pointerState.pointerSpeed.setY((prev.y - state.pointer.y) / delta);

    pointerStateRef.current.prevPointer.copy(state.pointer);
  });

  return (
    <>
      {boidsRef.current.map((boidProperty, index) => {
        return (
          <Boid
            key={index}
            spawnPositionRange={spawnPositionRange}
            borderPositionRange={borderPositionRange}
            properties={boidProperty}
            allBoids={boidsRef.current}
            pointerState={pointerStateRef.current}
          />
        );
      })}
    </>
  );
};

export default Boids;
