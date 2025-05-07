
import React, { Suspense, useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Text3D,
  Float,
  Stars,
  useTexture,
  MeshDistortMaterial,
  Sparkles
} from "@react-three/drei";
import * as THREE from "three";

import Ground from "./Ground";
import Player from "./Player";

interface GameCanvasProps {
  onInteract: (sectionId: string) => void;
}

// Interactive spot component with enhanced visuals
const InfoSpot = ({ position, label, color, id }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Add subtle hover animation
      meshRef.current.position.y = 0.5 + Math.sin(clock.getElapsedTime() * 2 + position[0]) * 0.1;
      // Add subtle rotation
      meshRef.current.rotation.y += 0.005;
    }
    
    if (ringRef.current) {
      // Animate the ring
      ringRef.current.scale.x = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
      ringRef.current.scale.y = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* Floating text with better material */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 2, 0]}>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.5}
            height={0.1}
            curveSegments={16}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelSegments={5}
          >
            {label}
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={0.6} 
              metalness={0.7}
              roughness={0.2}
            />
          </Text3D>
        </group>
      </Float>
      
      {/* Interactive spot with distortion effect */}
      <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          speed={2}
          distort={0.3}
        />
      </mesh>
      
      {/* Base platform */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1, 1.2, 0.1, 16]} />
        <meshStandardMaterial 
          color={color}
          opacity={0.7}
          transparent
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* Add sparkles */}
      <Sparkles 
        count={50}
        scale={[3, 3, 3]}
        position-y={1.5}
        size={6}
        speed={0.3}
        opacity={0.7}
        color={color}
      />
      
      {/* Add light */}
      <pointLight 
        color={color} 
        intensity={3} 
        distance={6}
        position={[0, 1, 0]}
        castShadow
      />
      
      {/* Add light ring effect */}
      <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.3, 32]} />
        <meshBasicMaterial 
          color={color} 
          opacity={0.3} 
          transparent 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
};

const GameCanvas: React.FC<GameCanvasProps> = ({ onInteract }) => {
  // Create spot locations for info zones
  const infoSpots = useMemo(() => [
    {
      id: "about",
      position: [6, 0, 6],
      label: "About Me",
      color: "#8b5cf6"
    },
    {
      id: "projects",
      position: [-6, 0, 6],
      label: "Experience",
      color: "#6366f1"
    },
    {
      id: "contact",
      position: [0, 0, -6],
      label: "Projects",
      color: "#ec4899"
    }
  ], []);

  return (
    <Canvas shadows className="w-full h-full">
      {/* Enhanced Camera */}
      <PerspectiveCamera makeDefault position={[0, 10, 12]} fov={50} />
      <OrbitControls 
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minDistance={5}
        maxDistance={20}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
      />
      
      {/* Enhanced Environment */}
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 10, 30]} />
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0.5} fade speed={1} />
      
      {/* Game elements */}
      <Suspense fallback={null}>
        <Ground />
        <Player onInteract={onInteract} />
        
        {/* Enhanced Info spots */}
        {infoSpots.map((spot) => (
          <InfoSpot 
            key={spot.id}
            id={spot.id}
            position={spot.position}
            label={spot.label}
            color={spot.color}
          />
        ))}
        
        {/* Enhanced environment with better lighting */}
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

export default GameCanvas;
