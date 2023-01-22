import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { BoxGeometry, Material, Mesh, MeshStandardMaterial } from "three";

export default function Cube() {
  const meshRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }

    if (state.pointer.x < 0 && state.pointer.y < 0) {
      meshRef.current.material.color.setRGB(1, 0, 0);
    } else {
      meshRef.current.material.color.setRGB(0.5, 0.5, 0.5);
    }
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <PerspectiveCamera />
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
  useFrame((state, delta) => {
    // console.log(state.pointer, delta);
  });

  return (
    <mesh receiveShadow={true} onClick={() => console.log("clicked")}>
      <boxBufferGeometry />
      <meshPhysicalMaterial color="black" />
    </mesh>
  );
}
