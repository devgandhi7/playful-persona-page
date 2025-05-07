
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Ground = () => {
  const gridSize = 20;
  const gridDivisions = 20;
  const groundRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame(({ clock }) => {
    if (groundRef.current) {
      // Smoother ground animation with better timing
      groundRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.03;
    }
    
    if (gridRef.current) {
      // Enhanced grid pulse animation
      const gridMaterial = gridRef.current.material as THREE.Material;
      if (Array.isArray(gridMaterial)) {
        gridMaterial.forEach(mat => {
          if (mat instanceof THREE.LineBasicMaterial) {
            mat.opacity = 0.7 + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
          }
        });
      }
    }
  });

  // Create more interesting decorative elements with varied patterns
  const generateDecorations = () => {
    const decorations = [];
    
    // Create a spiral pattern of elements
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        const angle = j * 0.6 + i * Math.PI * 2 / 3;
        const radius = 3 + j * 0.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        const size = 0.2 + (j % 3) * 0.15;
        const height = 0.1 + (j % 4) * 0.2;
        
        // Alternate between different shapes
        const shape = j % 3;
        
        decorations.push(
          <group 
            key={`spiral-${i}-${j}`} 
            position={[x, height / 2, z]}
            rotation={[0, angle, 0]}
          >
            {shape === 0 && (
              <mesh castShadow receiveShadow>
                <boxGeometry args={[size, height, size]} />
                <meshStandardMaterial 
                  color="#8b5cf6" 
                  roughness={0.5}
                  emissive="#5b21b6"
                  emissiveIntensity={0.4}
                />
              </mesh>
            )}
            
            {shape === 1 && (
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[size/2, size/2, height, 8]} />
                <meshStandardMaterial 
                  color="#6366f1" 
                  roughness={0.4}
                  emissive="#4338ca"
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
            
            {shape === 2 && (
              <mesh castShadow receiveShadow>
                <capsuleGeometry args={[size/3, size, 8, 8]} />
                <meshStandardMaterial 
                  color="#ec4899" 
                  roughness={0.6}
                  emissive="#be185d"
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
          </group>
        );
      }
    }
    
    // Add some larger platform structures
    for (let i = 0; i < 3; i++) {
      const angle = i * Math.PI * 2 / 3;
      const distance = 7;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      
      decorations.push(
        <group key={`platform-${i}`} position={[x, 0.15, z]} rotation={[0, angle, 0]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[1.5, 1.8, 0.3, 8]} />
            <meshStandardMaterial 
              color="#1a2b63"
              metalness={0.6}
              roughness={0.3}
              emissive="#1a1f35"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[0, 0.3, 0]} castShadow>
            <torusGeometry args={[1, 0.2, 16, 32]} />
            <meshStandardMaterial 
              color="#8b5cf6"
              metalness={0.7} 
              roughness={0.2}
              emissive="#6d28d9"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      );
    }
    
    return decorations;
  };

  return (
    <group ref={groundRef}>
      {/* Main floor with enhanced material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial 
          color="#1a1f35" 
          roughness={0.6}
          metalness={0.4}
          envMapIntensity={0.7}
        />
      </mesh>
      
      {/* Glowing grid with animation */}
      <gridHelper 
        ref={gridRef}
        args={[gridSize, gridDivisions, "#8b5cf6", "#2f365f"]} 
        position={[0, 0.01, 0]}
      />
      
      {/* Generate decorative elements with better visual structure */}
      {generateDecorations()}
    </group>
  );
};

export default Ground;
