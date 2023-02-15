import {
  getRandomVector3,
  getUnprojectedCords,
  UtilsRange,
} from "@/utils/vectorUtils";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, RefObject, useRef } from "react";
import * as THREE from "three";
import Boid, { BoidProperties } from "./Boid";

const useWidthHeight = (dist: number) => {
  const { camera } = useThree() as { camera: THREE.PerspectiveCamera };

  var vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians

  var height = 2 * Math.tan(vFOV / 2) * (camera.position.z - dist); // visible height

  var width = height * camera.aspect; // visible width

  return { height, width };
};

const Boids = () => {
  const count = 100;

  const pointerStateRef = useRef({
    prevPointer: new THREE.Vector2(0, 0),
    pointerDirection: { left: 0, right: 0 },
  });

  const { camera } = useThree() as { camera: THREE.PerspectiveCamera };
  const depth = camera.position.z / 2;

  const { width, height } = useWidthHeight(0);
  // console.log({ width, height });

  const spawnPositionRange = {
    x: { min: 0, max: width / 2 },
    y: { min: -height / 2, max: height / 2 },
    z: { min: -4, max: 0 },
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

    if (!pointerState) return;

    var prev = pointerState.prevPointer;

    if (prev.x > state.pointer.x) {
      pointerState.pointerDirection.left = (prev.x - state.pointer.x) / delta;
      pointerState.pointerDirection.right = 0;
    }
    if (prev.x < state.pointer.x) {
      pointerState.pointerDirection.right = (state.pointer.x - prev.x) / delta;
      pointerState.pointerDirection.left = 0;
    }

    if (prev.x === state.pointer.x) {
      pointerState.pointerDirection.right = 0;
      pointerState.pointerDirection.left = 0;
    }

    pointerStateRef.current.prevPointer.copy(state.pointer);
  });

  return (
    <>
      {/* <mesh position={[getMid(bd.x), getMid(bd.x), getMid(bd.x)]}>
        <meshStandardMaterial wireframe={false} />
        <boxGeometry args={[getDif(bd.x), getDif(bd.x), getDif(bd.x)]} />
      </mesh> */}
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
/*
a <- b
(a + b + v - (a * count))* coe

force = a * co + b*co + c*coe
force = (a + b +c)*coe

*/
