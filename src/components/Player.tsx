import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardControls } from "@react-three/drei";

interface PlayerProps {
  onInteract: (sectionId: string) => void;
}

// Define interaction zones
const interactionZones = [
  { id: "about", position: new THREE.Vector3(5, 0, 5), radius: 2 },
  { id: "projects", position: new THREE.Vector3(-5, 0, 5), radius: 2 },
  { id: "contact", position: new THREE.Vector3(0, 0, -5), radius: 2 },
];

const Player: React.FC<PlayerProps> = ({ onInteract }) => {
  const playerRef = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const [jumping, setJumping] = useState(false);
  const [nearbyZone, setNearbyZone] = useState<string | null>(null);

  // Simple physics parameters
  const speed = 5;
  const jumpForce = 5;
  const gravity = 15;

  // Setup keyboard controls
  const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    interact: false,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.forward = true;
      if (e.code === 'KeyS') keys.backward = true;
      if (e.code === 'KeyA') keys.left = true;
      if (e.code === 'KeyD') keys.right = true;
      if (e.code === 'Space') keys.jump = true;
      if (e.code === 'KeyE') keys.interact = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.forward = false;
      if (e.code === 'KeyS') keys.backward = false;
      if (e.code === 'KeyA') keys.left = false;
      if (e.code === 'KeyD') keys.right = false;
      if (e.code === 'Space') keys.jump = false;
      if (e.code === 'KeyE') keys.interact = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useFrame((state, delta) => {
    if (!playerRef.current) return;

    // Get the player's current position
    const position = playerRef.current.position;

    // Reset direction
    direction.current.set(0, 0, 0);

    // Apply movement based on keys
    if (keys.forward) direction.current.z = -1;
    if (keys.backward) direction.current.z = 1;
    if (keys.left) direction.current.x = -1;
    if (keys.right) direction.current.x = 1;

    // Normalize direction vector to keep consistent speed in all directions
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Apply speed to direction
    velocity.current.x = direction.current.x * speed * delta;
    velocity.current.z = direction.current.z * speed * delta;

    // Handle jumping
    if (keys.jump && !jumping && position.y <= 0.5) {
      velocity.current.y = jumpForce * delta;
      setJumping(true);
    }

    // Apply gravity
    if (position.y > 0) {
      velocity.current.y -= gravity * delta;
    } else if (position.y < 0) {
      position.y = 0;
      velocity.current.y = 0;
      setJumping(false);
    }

    // Update player position
    position.add(velocity.current);

    // Rotate player to face movement direction
    if (direction.current.x !== 0 || direction.current.z !== 0) {
      const angle = Math.atan2(direction.current.x, direction.current.z);
      playerRef.current.rotation.y = angle;
    }

    // Check for interaction zones
    let isNearZone = false;
    interactionZones.forEach(zone => {
      const distance = position.distanceTo(zone.position);
      if (distance < zone.radius) {
        isNearZone = true;
        setNearbyZone(zone.id);
        
        // Check for interaction key
        if (keys.interact) {
          onInteract(zone.id);
          keys.interact = false; // Reset to prevent multiple triggers
        }
      }
    });

    if (!isNearZone) {
      setNearbyZone(null);
    }

    // Boundary checks - keep player in the grid
    const boundary = 9;
    if (position.x < -boundary) position.x = -boundary;
    if (position.x > boundary) position.x = boundary;
    if (position.z < -boundary) position.z = -boundary;
    if (position.z > boundary) position.z = boundary;
  });

  return (
    <group ref={playerRef} position={[0, 0, 0]}>
      {/* Player body */}
      <mesh castShadow position={[0, 0.75, 0]}>
        <capsuleGeometry args={[0.3, 1, 4, 8]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Player head */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#a78bfa" roughness={0.2} metalness={0.5} />
      </mesh>
      
      {nearbyZone && (
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight color="#ffffff" intensity={0.5} distance={3} />
        </mesh>
      )}
    </group>
  );
};

export default Player;
