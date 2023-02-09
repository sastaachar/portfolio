import { getRandomVector3, UtilsRange } from "@/utils/vectorUtils";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, RefObject, useRef } from "react";
import * as THREE from "three";

const useWidthHeight = (dist: number) => {
  const { camera } = useThree() as { camera: THREE.PerspectiveCamera };

  var vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians

  var height = 2 * Math.tan(vFOV / 2) * (camera.position.z - dist); // visible height

  var width = height * camera.aspect; // visible width

  return { height, width };
};

type BoidProperties = {
  direction: THREE.Vector3;
  index: number;
  meshRef: RefObject<
    THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
  > | null;
};

const Boids = () => {
  const count = 20;

  const { camera } = useThree() as { camera: THREE.PerspectiveCamera };
  const depth = camera.position.z / 2;

  const { width, height } = useWidthHeight(depth / 2);
  console.log({ width, height });

  const boidsRef = useRef(
    Array<BoidProperties | null>(count)
      .fill(null)
      .map((_, index) => {
        return {
          direction: getRandomVector3({ min: -0.1, max: 0.1 }),
          index,
          meshRef: null,
        };
      })
  );

  // const light = useRef<DirectionalLight>(null);

  return (
    <>
      {boidsRef.current.map((boidProperty, index) => {
        return (
          <Boid
            key={index}
            spawnPositionRange={{
              x: { min: 0, max: width / 2 },
              y: { min: -height / 2, max: height / 2 },
              z: { min: -2, max: 2 },
            }}
            properties={boidProperty}
            allBoids={boidsRef.current}
          />
        );
      })}
    </>
  );
};

type BoidProps = {
  spawnPositionRange: { x: UtilsRange; y: UtilsRange; z: UtilsRange };
  properties: BoidProperties;
  allBoids: BoidProperties[];
};

const Boid: FC<BoidProps> = ({ spawnPositionRange, properties, allBoids }) => {
  const position = getRandomVector3(spawnPositionRange.x, spawnPositionRange.y);

  const boundaries = spawnPositionRange;

  const directionRef = properties.direction;

  properties.meshRef = useRef(null);

  const ref =
    useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>(null);

  useFrame((state, delta) => {
    if (!properties.meshRef || !properties.meshRef.current || !directionRef)
      return;
    const mesh = properties.meshRef.current;

    const direction = directionRef;

    for (let i = 0; i < allBoids.length; i++) {
      const element = allBoids[i];
      if (element.index === properties.index) continue;

      const sway = element.direction.clone().multiplyScalar(0.001);

      direction.add(sway);
    }

    const r = Math.floor(127.5 * (1 + direction.x)),
      g = Math.floor(127.5 * (1 + direction.y)),
      b = Math.floor(127.5 * (1 + direction.z));

    mesh.material.color = new THREE.Color(r, g, b);

    updateCrossedBoundaryDirection(mesh.position, boundaries, direction);

    // const curDir = direction;
    mesh.position.add(direction.clone().multiplyScalar(delta));
  });

  return (
    <mesh position={position} ref={properties.meshRef}>
      <meshStandardMaterial />
      <sphereGeometry args={[0.01]} />
    </mesh>
  );
};

const isBetween = (value: number, { min, max }: UtilsRange) => {
  return min < value && value < max;
};

const updateCrossedBoundaryDirection = (
  position: THREE.Vector3,
  boundaries: { x: UtilsRange; y: UtilsRange; z: UtilsRange },
  direction: THREE.Vector3
) => {
  if (
    !isBetween(position.x + direction.x, boundaries.x) ||
    !isBetween(position.y + direction.y, boundaries.y) ||
    !isBetween(position.z + direction.z, boundaries.z)
  ) {
    direction.multiplyScalar(-1);
    return;
  }
  // if (!isBetween(position.y + direction.y, boundaries.y)) {
  //   direction.y *= -1;
  // }
  // if (!isBetween(position.z + direction.z, boundaries.z)) {
  //   direction.z *= -1;
  // }

  return direction;
};

export default Boids;
