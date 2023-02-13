import * as THREE from "three";

const defaultRange = { min: -1, max: 1 };

export const getRandRange = (range: UtilsRange = defaultRange) => {
  return Math.random() * (range.max - range.min) + range.min;
};

export const getRandomVector3 = (
  xRange: UtilsRange = defaultRange,
  yRange: UtilsRange = defaultRange,
  zRange: UtilsRange = defaultRange
): THREE.Vector3 => {
  return new THREE.Vector3(
    getRandRange(xRange),
    getRandRange(yRange),
    getRandRange(zRange)
  );
};

export const getUnitVector = (vector: THREE.Vector3): THREE.Vector3 => {
  const a = Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
  );

  return new THREE.Vector3(vector.x / a, vector.y / a, vector.z / a);
};
export const getUnprojectedCords = (
  base: THREE.Vector2,
  camera: THREE.Camera
) => {
  return new THREE.Vector3(base.x, base.y, 0.5).unproject(camera);
};

export type UtilsRange = {
  min: number;
  max: number;
};
