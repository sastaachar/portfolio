import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { random } from "maath";
import { useRef, useState } from "react";

type StarsProps = {
  color: string;
};

const Stars = (props: StarsProps) => {
  const ref = useRef<THREE.Points<THREE.BufferGeometry, THREE.Material>>(null);
  const [sphere] = useState<Float32Array>(
    () =>
      random.inSphere(new Float32Array(5000), { radius: 20 }) as Float32Array
  );
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={props.color}
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default Stars;
