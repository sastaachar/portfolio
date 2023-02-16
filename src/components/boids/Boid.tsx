import {
  getRandomVector3,
  getUnprojectedCords,
  UtilsRange,
} from "@/utils/vectorUtils";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, RefObject, useRef } from "react";
import { Vector3 } from "three";
import * as THREE from "three";

const alignmentCoef = 0.01;
const sqRadiusOfVision = 1;
const separationCoef = 0.01;
const cohesionCoef = 0.01;
const purple = new Vector3(134, 133, 239);
const green = new Vector3(0, 169, 127);

const getMid = (range: UtilsRange) => (range.max + range.min) / 2;
const getDif = (range: UtilsRange) => range.max - range.min;

const Boid: FC<BoidProps> = ({
  spawnPositionRange,
  borderPositionRange,
  properties,
  allBoids,
  pointerState,
}) => {
  const position = getRandomVector3(
    spawnPositionRange.x,
    spawnPositionRange.y,
    spawnPositionRange.z
  );

  const boundaries = borderPositionRange;

  const velocity = properties.velocity;

  // set ref
  properties.meshRef =
    useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>(null);

  const { camera } = useThree();

  useFrame((state, delta) => {
    if (!properties.meshRef || !properties.meshRef.current || !velocity) return;

    const mesh = properties.meshRef.current;

    // its currently O(3*n)
    addCohesionForce(mesh, allBoids, properties.index, velocity);
    addSeparationForce(mesh, allBoids, properties.index, velocity);
    addAlignmentForce(mesh, allBoids, properties.index, velocity);

    velocity.setX(velocity.x - pointerState.pointerSpeed.x / 50);
    velocity.setY(velocity.y - pointerState.pointerSpeed.y / 50);

    if (velocity.x > 1 || velocity.y > 1 || velocity.z > 1)
      velocity.multiplyScalar(0.99);
    // capSpeed(velocity);
    updateBoidMovement(mesh, spawnPositionRange, boundaries, velocity, delta);

    const direction = velocity.clone().normalize();

    updateColor(direction, mesh);

    // update direction
    mesh.quaternion.setFromUnitVectors(mesh.up, direction);
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
      <coneGeometry args={[0.05, 0.3]} />
    </mesh>
  );
};
const updateColor = (
  direction: Vector3,
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
) => {
  if (!direction.x || !direction.y || !direction.z) return;
  const color = new Vector3();
  color.lerpVectors(purple, green, (direction.x + direction.y + 2) / 4);
  const r = Math.floor(color.x);
  const g = Math.floor(color.y);
  const b = Math.floor(color.z);
  mesh.material.color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
};

const capSpeed = (velocity: THREE.Vector3) => {
  if (Math.abs(velocity.x) > 1) velocity.setX(velocity.x / velocity.x);
  if (Math.abs(velocity.y) > 1) velocity.setY(velocity.y / velocity.y);
  if (Math.abs(velocity.z) > 1) velocity.setZ(velocity.z / velocity.z);
};

const addAlignmentForce = (
  mesh: THREE.Mesh,
  allBoids: BoidProperties[],
  index: number,
  velocity: Vector3
) => {
  var alignmentForce = new Vector3();
  for (var i = 0; i < allBoids.length; i++) {
    const boid = allBoids[i];
    if (index === boid.index) continue;

    if (!boid.meshRef?.current) continue;
    const boidMesh = boid.meshRef.current;

    const sqDist = mesh.position.distanceToSquared(boidMesh.position);

    if (sqDist > sqRadiusOfVision) continue;

    alignmentForce.add(boid.velocity);
  }

  velocity.add(alignmentForce.multiplyScalar(0.0001));
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

    if (sqDist > sqRadiusOfVision / 4) continue;

    const repulsionForce = mesh.position.clone().sub(boidMesh.position);
    separationForce.add(repulsionForce.multiplyScalar(0.01));
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
  var count = 1;
  for (var i = 0; i < allBoids.length; i++) {
    const boid = allBoids[i];
    if (index === boid.index) continue;

    if (!boid.meshRef?.current) continue;
    const boidMesh = boid.meshRef.current;

    const sqDist = mesh.position.distanceToSquared(boidMesh.position);
    if (sqDist > 1) continue;

    ++count;
    centerOfGroup.add(boid.meshRef.current.position);
  }

  centerOfGroup.multiplyScalar(1 / count);

  const directionTowardsCenter = centerOfGroup.sub(mesh.position);

  directionTowardsCenter.multiplyScalar(0.1);

  velocity.add(directionTowardsCenter);
  return directionTowardsCenter;
};

const updateBoidMovement = (
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>,
  spawnRange: Vector3Range,
  boundaries: Vector3Range,
  velocity: Vector3,
  delta: number
) => {
  updateCrossedBoundaryVelocity(mesh.position, boundaries, velocity, delta);

  const distance = velocity.clone().multiplyScalar(delta);
  mesh.position.add(distance);

  handleOutOfBorders(mesh, boundaries, spawnRange);
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
  boundaries: Vector3Range,
  spawnRange: Vector3Range
) => {
  if (!isBetween(mesh.position.x, boundaries.x))
    mesh.position.setX(getMid(spawnRange.x));
  if (!isBetween(mesh.position.y, boundaries.y))
    mesh.position.setY(getMid(spawnRange.y));
  if (!isBetween(mesh.position.z, boundaries.z))
    mesh.position.setZ(getMid(spawnRange.z));
};

export type PointerState = {
  prevPointer: THREE.Vector2;
  pointerSpeed: THREE.Vector2;
};
export type BoidProps = {
  spawnPositionRange: Vector3Range;
  borderPositionRange: Vector3Range;
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
