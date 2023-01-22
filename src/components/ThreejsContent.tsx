import {
  Environment,
  Grid,
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { MutableRefObject, useRef } from "react";
import { Color, Group, MeshBasicMaterial, PointLight } from "three";
import { easing } from "maath";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Cube from "./Cube";

type ThreejsContentProps = {
  container: MutableRefObject<HTMLDivElement>;
};

export default function ThreejsContent({ container }: ThreejsContentProps) {
  return (
    <div className="threejs-wrapper">
      <Canvas
        gl={{ logarithmicDepthBuffer: true }}
        shadows
        camera={{ position: [-15, 0, 10], fov: 25 }}
        eventSource={container}>
        <fog attach="fog" args={["black", 15, 21.5]} />
        <Stage
          intensity={0.5}
          environment="city"
          shadows={{ type: "accumulative", bias: -0.001 }}
          adjustCamera={false}>
          <Kamdo rotation={[0, Math.PI, 0]} />
        </Stage>
        <Grid
          renderOrder={-1}
          position={[0, -1.85, 0]}
          infiniteGrid
          cellSize={0.6}
          cellThickness={0.6}
          sectionSize={3.3}
          sectionThickness={1.5}
          sectionColor={new Color(0, 0, 0)}
          fadeDistance={30}
        />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.05}
          enableZoom={false}
          makeDefault
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur />
        </EffectComposer>
        <Environment background preset="sunset" blur={0.8} />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube />
      </Canvas>
    </div>
  );
}

type KamdoProps = {
  rotation: [number, number, number];
};

function Kamdo(props: KamdoProps) {
  const head = useRef() as MutableRefObject<Group>;
  const stripe = useRef() as MutableRefObject<MeshBasicMaterial>;
  const light = useRef() as MutableRefObject<PointLight>;
  const { nodes, materials } = useGLTF("model.glb");
  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
    const s = stripe.current as MeshBasicMaterial;
    const h = head.current as Group;
    const r = h.rotation as THREE.Euler;
    const l = light.current;
    if (!l) return;
    if (!r) return;
    s.color.setRGB(1 + t * 10, 2, 20 + t * 50);
    easing.dampE(
      r,
      [
        0,
        (state.pointer.y + state.pointer.x) *
          (state.camera.position.z > 1 ? 1 : -1),
        0,
      ],
      0.4,
      delta
    );
    l.intensity = 1 + t * 2;
  });
  return (
    <group {...props}>
      <mesh
        castShadow
        receiveShadow
        //@ts-ignore
        geometry={nodes.body001.geometry}
        material={materials.Body}
      />
      <group ref={head}>
        <mesh
          castShadow
          receiveShadow
          //@ts-ignore
          geometry={nodes.head001.geometry}
          material={materials.Head}
        />
        {
          //@ts-ignore
        }
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.stripe001.geometry}>
          <meshBasicMaterial ref={stripe} toneMapped={false} />
          <pointLight
            ref={light}
            intensity={1}
            color={[10, 2, 5]}
            distance={2.5}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("model.glb");
