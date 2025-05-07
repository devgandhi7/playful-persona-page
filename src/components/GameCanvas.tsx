
import React, { Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Sky,
  Text3D,
  Float,
  Stars
} from "@react-three/drei";
import * as THREE from "three";

import Ground from "./Ground";
import Player from "./Player";

interface GameCanvasProps {
  onInteract: (sectionId: string) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ onInteract }) => {
  // Create spot locations for info zones
  const infoSpots = useMemo(() => [
    {
      id: "about",
      position: [5, 0, 5],
      label: "About Me",
      color: "#8b5cf6"
    },
    {
      id: "projects",
      position: [-5, 0, 5],
      label: "Projects",
      color: "#6366f1"
    },
    {
      id: "contact",
      position: [0, 0, -5],
      label: "Contact",
      color: "#ec4899"
    }
  ], []);

  return (
    <Canvas shadows className="w-full h-full">
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 10, 12]} fov={50} />
      <OrbitControls 
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minDistance={5}
        maxDistance={20}
        enablePan={false}
      />
      
      {/* Environment */}
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 10, 30]} />
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Game elements */}
      <Suspense fallback={null}>
        <Ground />
        <Player onInteract={onInteract} />
        
        {/* Info spots */}
        {infoSpots.map((spot) => (
          <group key={spot.id} position={[spot.position[0], 0, spot.position[2]]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <mesh position={[0, 2, 0]}>
                <Text3D
                  font="/fonts/Inter_Bold.json"
                  size={0.5}
                  height={0.1}
                  curveSegments={12}
                >
                  {spot.label}
                  <meshStandardMaterial 
                    color={spot.color} 
                    emissive={spot.color} 
                    emissiveIntensity={0.5} 
                  />
                </Text3D>
              </mesh>
            </Float>
            
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.7, 1, 1, 16]} />
              <meshStandardMaterial 
                color={spot.color}
                emissive={spot.color}
                emissiveIntensity={0.3}
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
            
            <pointLight 
              color={spot.color} 
              intensity={2} 
              distance={5}
              position={[0, 1, 0]}
            />
          </group>
        ))}
        
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default GameCanvas;
