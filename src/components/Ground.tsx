
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Ground = () => {
  const gridSize = 20;
  const gridDivisions = 20;
  const groundRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame(({ clock }) => {
    if (groundRef.current) {
      // Add subtle animation to the ground
      groundRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.03;
    }
    
    if (gridRef.current) {
      // Pulse animation for the grid
      const gridMaterial = gridRef.current.material as THREE.Material;
      if (Array.isArray(gridMaterial)) {
        gridMaterial.forEach(mat => {
          if (mat instanceof THREE.LineBasicMaterial) {
            mat.opacity = 0.6 + Math.sin(clock.getElapsedTime() * 0.5) * 0.4;
          }
        });
      }
    }
  });

  return (
    <group ref={groundRef}>
      {/* Main floor with better material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial 
          color="#1a1f35" 
          roughness={0.7}
          metalness={0.3}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Glowing grid with animation */}
      <gridHelper 
        ref={gridRef}
        args={[gridSize, gridDivisions, "#8b5cf6", "#2f365f"]} 
        position={[0, 0.01, 0]}
      />
      
      {/* Enhanced decorative elements */}
      {[...Array(15)].map((_, index) => {
        const size = Math.random() * 0.6 + 0.3;
        const x = Math.random() * 18 - 9;
        const z = Math.random() * 18 - 9;
        const height = Math.random() * 0.5 + 0.1;
        const rotation = Math.random() * Math.PI * 2;
        
        // Choose between different types of decorative elements
        const elementType = Math.floor(Math.random() * 3);
        
        return (
          <group 
            key={index} 
            position={[x, height / 2, z]}
            rotation={[0, rotation, 0]}
          >
            {elementType === 0 && (
              // Glowing cube
              <mesh castShadow receiveShadow>
                <boxGeometry args={[size, height, size]} />
                <meshStandardMaterial 
                  color="#8b5cf6" 
                  roughness={0.5}
                  emissive="#5b21b6"
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
            
            {elementType === 1 && (
              // Cylinder
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[size/2, size/2, height, 8]} />
                <meshStandardMaterial 
                  color="#6366f1" 
                  roughness={0.4}
                  emissive="#4338ca"
                  emissiveIntensity={0.2}
                />
              </mesh>
            )}
            
            {elementType === 2 && (
              // Capsule
              <mesh castShadow receiveShadow>
                <capsuleGeometry args={[size/3, size, 8, 8]} />
                <meshStandardMaterial 
                  color="#ec4899" 
                  roughness={0.6}
                  emissive="#be185d"
                  emissiveIntensity={0.2}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default Ground;
