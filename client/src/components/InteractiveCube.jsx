import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const InteractiveCube = (props) => {
  const meshRef = useRef();
  
  // Rotate the cube
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      {...props}
    >
      <boxGeometry args={[1, 0.5, 1.5]} />
      <meshStandardMaterial 
        color="white" 
        wireframe={true}
        emissive="white"
        emissiveIntensity={0.5}
        transparent={true}
        opacity={0.8}
        wireframeLinewidth={2}
      />
    </mesh>
  );
};

export default InteractiveCube;
