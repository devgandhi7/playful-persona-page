
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Ground = () => {
  const gridSize = 20;
  const gridDivisions = 20;
  const groundRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groundRef.current) {
      // Add subtle animation to the ground
      groundRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.03;
    }
  });

  return (
    <group ref={groundRef}>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial 
          color="#1a1f35" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Glowing grid */}
      <gridHelper 
        args={[gridSize, gridDivisions, "#8b5cf6", "#2f365f"]} 
        position={[0, 0.01, 0]} 
      />
      
      {/* Decorative elements */}
      {[...Array(10)].map((_, index) => {
        const size = Math.random() * 0.5 + 0.3;
        const x = Math.random() * 18 - 9;
        const z = Math.random() * 18 - 9;
        const height = Math.random() * 0.3 + 0.1;
        
        return (
          <mesh 
            key={index} 
            position={[x, height / 2, z]} 
            castShadow 
            receiveShadow
          >
            <boxGeometry args={[size, height, size]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              roughness={0.5}
              emissive="#5b21b6"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Ground;
