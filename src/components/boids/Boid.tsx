import {
  getRandomVector3,
  getUnprojectedCords,
  UtilsRange,
} from "@/utils/vectorUtils";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, RefObject, useRef } from "react";
import { Vector3 } from "three";
import * as THREE from "three";

const alignmentCoef = 0.5;
const sqRadiusOfVison = 4;
const separationCoef = 0.01;
const cohesionCoef = 0.01;

const getMid = (range: UtilsRange) => (range.max + range.min) / 2;
const getDif = (range: UtilsRange) => range.max - range.min;
const Boid: FC<BoidProps> = ({ spawnPositionRange, properties, allBoids }) => {
  const position = getRandomVector3(
    spawnPositionRange.x,
    spawnPositionRange.y,
    spawnPositionRange.z
  );

  const boundaries = spawnPositionRange;

  const velocity = properties.velocity;

  properties.meshRef =
    useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>(null);

  const { camera } = useThree();

  useFrame((state, delta) => {
    if (!properties.meshRef || !properties.meshRef.current || !velocity) return;

    const mesh = properties.meshRef.current;

    // updateVelocityUsingBoidLogic(mesh, velocity, allBoids, properties.index);

    updateBoidMovement(mesh, boundaries, velocity, delta);

    // const direction = velocity.clone().normalize();
    // const r = Math.floor(127.5 * (1 + direction.x)),
    //   g = Math.floor(127.5 * (1 + direction.y)),
    //   b = Math.floor(127.5 * (1 + direction.z));
    // mesh.material.color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);

    // mesh.quaternion.setFromUnitVectors(mesh.up, direction);
  });

  return (
    <mesh
      position={position}
      ref={properties.meshRef}
      onPointerEnter={() => {
        properties.meshRef?.current?.material.color.setHex(0x00754b);
        setTimeout(() => {
          properties.meshRef?.current?.material.color.setHex(0x8685ef);
        }, 5000);
      }}
    >
      <meshBasicMaterial color={"#8685ef"} />
      <sphereGeometry args={[0.05]} />
    </mesh>
  );
};

const updateVelocityUsingBoidLogic = (
  mesh: THREE.Mesh,
  velocity: Vector3,
  allBoids: BoidProperties[],
  index: number
) => {
  addCohesionForce(mesh, allBoids, index, velocity);
  addSeparationForce(mesh, allBoids, index, velocity);
  addAlignmentForce(mesh, allBoids, index, velocity);

  velocity.multiplyScalar(0.99);
};

const addAlignmentForce = (
  mesh: THREE.Mesh,
  allBoids: BoidProperties[],
  index: number,
  velocity: Vector3
) => {
  const alignmentForce = new Vector3();
  for (var i = 0; i < allBoids.length; i++) {
    const boid = allBoids[i];
    if (index === boid.index) continue;

    if (!boid.meshRef?.current) continue;
    const boidMesh = boid.meshRef.current;

    const sqDist = mesh.position.distanceToSquared(boidMesh.position);
    if (sqDist > 1) continue;

    alignmentForce.add(velocity);
  }

  alignmentForce.multiplyScalar(0.001);
  velocity.add(alignmentForce);
};
const addSeparationForce = (
  mesh: THREE.Mesh,
  allBoids: BoidProperties[],
  index: number,
  velocity: Vector3
) => {
  const separationForce = new Vector3();
  for (var i = 0; i < allBoids.length; i++) {
    const boid = allBoids[i];
    if (index === boid.index) continue;

    if (!boid.meshRef?.current) continue;
    const boidMesh = boid.meshRef.current;

    const sqDist = mesh.position.distanceToSquared(boidMesh.position);
    if (sqDist > 1 && sqDist < 0.5) continue;

    const reuplsionForce = mesh.position.clone().sub(boidMesh.position);
    separationForce.add(reuplsionForce.multiplyScalar(0.01));
  }

  velocity.add(separationForce);
};
const addCohesionForce = (
  mesh: THREE.Mesh,
  allBoids: BoidProperties[],
  index: number,
  velocity: Vector3
) => {
  const centerOfGroup = mesh.position.clone();
  for (var i = 0; i < allBoids.length; i++) {
    const boid = allBoids[i];
    if (index === boid.index) continue;

    if (!boid.meshRef?.current) continue;
    const boidMesh = boid.meshRef.current;

    const sqDist = mesh.position.distanceToSquared(boidMesh.position);
    if (sqDist > 1) continue;

    centerOfGroup.add(boid.meshRef.current.position);
  }

  const directionTowardsCenter = centerOfGroup.sub(mesh.position);

  velocity.add(directionTowardsCenter.multiplyScalar(0.0001));

  return directionTowardsCenter;
};

const updateVelocityUsingBoidLogic2 = (
  mesh: THREE.Mesh,
  velocity: Vector3,
  allBoids: BoidProperties[],
  index: number
) => {
  const centerOfGroup = mesh.position.clone();

  const align = new Vector3(0, 0, 0);
  const sep = new Vector3(0, 0, 0);

  const newVelocity = velocity.clone();

  var countOfNeighbors = 0;

  for (var i = 0; i < allBoids.length; i++) {
    const boid = allBoids[i];

    if (!boid.meshRef?.current) continue;
    if (boid.index === index) continue;

    const sqDist = Math.sqrt(
      mesh.position.distanceToSquared(boid.meshRef.current.position)
    );

    if (sqDist > 2) continue;

    if (sqDist > 0.5 && sqDist < 1) {
      centerOfGroup.add(boid.meshRef.current.position);
      ++countOfNeighbors;
    }

    if (sqDist > 0.5 && sqDist < 1) {
      const force = boid.velocity.clone().multiplyScalar(0.00001 / sqDist);
      newVelocity.add(force);
    }

    if (sqDist > 0.5) {
      const force = boid.meshRef.current.position
        .clone()
        .sub(mesh.position)
        .multiplyScalar(0.0001 / sqDist);
      newVelocity.add(force);
    }
  }

  centerOfGroup.multiplyScalar(1 / (1 + countOfNeighbors));
  const directionToCenter = centerOfGroup.sub(mesh.position);
  const cohesionForce = directionToCenter
    .clone()
    .normalize()
    .multiplyScalar(0.05);
  newVelocity.add(cohesionForce);
};

const updateBoidMovement = (
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>,
  boundaries: Vector3Range,
  velocity: Vector3,
  delta: number
) => {
  updateCrossedBoundaryVelocity(mesh.position, boundaries, velocity, delta);

  const distance = velocity.clone().multiplyScalar(delta);
  mesh.position.add(distance);

  handleOutOfBorders(mesh, boundaries);
};

type Vector3Range = { x: UtilsRange; y: UtilsRange; z: UtilsRange };

const isBetween = (value: number, { min, max }: UtilsRange) =>
  min < value && value < max;

const updateCrossedBoundaryVelocity = (
  position: THREE.Vector3,
  boundaries: Vector3Range,
  velocity: THREE.Vector3,
  delta: number
) => {
  if (!isBetween(position.x + velocity.x * delta, boundaries.x))
    velocity.setX(velocity.x * -1);
  if (!isBetween(position.y + velocity.y * delta, boundaries.y))
    velocity.setY(velocity.y * -1);
  if (!isBetween(position.z + velocity.z * delta, boundaries.z))
    velocity.setZ(velocity.z * -1);
  return velocity;
};

const handleOutOfBorders = (
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>,
  boundaries: { x: UtilsRange; y: UtilsRange; z: UtilsRange }
) => {
  if (!isBetween(mesh.position.x, boundaries.x))
    // mesh.material.color.setRGB(1, 0, 0),
    mesh.position.setX(getMid(boundaries.x));
  if (!isBetween(mesh.position.y, boundaries.y))
    // mesh.material.color.setRGB(1, 0, 0),
    mesh.position.setY(getMid(boundaries.y));
  if (!isBetween(mesh.position.z, boundaries.z))
    // mesh.material.color.setRGB(1, 0, 0),
    mesh.position.setZ(getMid(boundaries.z));
};

export type PointerState = {
  prevPointer: THREE.Vector2;
  pointerDirection: { left: number; right: number };
};
export type BoidProps = {
  spawnPositionRange: { x: UtilsRange; y: UtilsRange; z: UtilsRange };
  properties: BoidProperties;
  allBoids: BoidProperties[];
  pointerState: PointerState;
};

export type BoidProperties = {
  velocity: THREE.Vector3;
  index: number;
  meshRef: RefObject<
    THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
  > | null;
};

export default Boid;
