"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Interactive Floating Neural & Data Core matching Stitch #0052cc color palette
function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -time * 0.2;
      wireframeRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <group>
      {/* Distorted Inner Core with Stitch Enterprise Blue #0052cc */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0052cc"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.2}
          metalness={0.7}
          wireframe={false}
          opacity={0.9}
          transparent
        />
      </Sphere>

      {/* Outer Floating Technical Wireframe Grid */}
      <Sphere ref={wireframeRef} args={[2.1, 24, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4e6072"
          wireframe
          transparent
          opacity={0.35}
        />
      </Sphere>
    </group>
  );
}

// Orbital Feature Data Nodes (Representing Study Hours, Attendance, Previous Score, Sleep, Assignments, Tests)
function OrbitalDataNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const items = [];
    const count = 18;
    const radius = 3.2;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      items.push({ position: [x, y, z] as [number, number, number], id: i });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={node.id % 2 === 0 ? "#0052cc" : "#0c56d0"}
            emissive={node.id % 2 === 0 ? "#003d9b" : "#0052cc"}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Orbit Rings representing ML Decision Boundaries
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.12;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[3.0, 0.015, 16, 100]} />
      <meshStandardMaterial color="#4e6072" transparent opacity={0.35} />
    </mesh>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[520px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0052cc" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4e6072" />

        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <NeuralCore />
          <OrbitalDataNodes />
          <OrbitRing />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
