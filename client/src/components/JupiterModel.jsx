import React, { useRef, useEffect, useMemo, forwardRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';


const JupiterModel = forwardRef(({ onClick, isAnimating }, ref) => {
  const groupRef = useRef();
  const jupiterRef = useRef();
  const { size } = useThree();
  
  // Responsive sizing based on viewport width
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  
  // Calculate responsive sizes
  const getJupiterSize = () => {
    if (isMobile) return 1.2;
    if (isTablet) return 1.5;
    return 2;
  };
  
  // Simple material without complex texture generation
  const material = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0xf5f5f5,
      emissive: 0x111111,
      specular: 0x999999,
      shininess: 10,
      flatShading: true
    });
  }, []);
  
  // Rotate Jupiter
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });
  
  // Handle click animation with responsive scaling
  useEffect(() => {
    if (isAnimating && jupiterRef.current) {
      const scale = isMobile ? 1.2 : 1.5;
      gsap.to(jupiterRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else if (jupiterRef.current) {
      // Reset scale when not animating
      const baseScale = getJupiterSize() / 2;
      jupiterRef.current.scale.set(baseScale, baseScale, baseScale);
    }
  }, [isAnimating, isMobile]);
  
  // Handle window resize
  useEffect(() => {
    if (jupiterRef.current) {
      const scale = getJupiterSize() / 2;
      jupiterRef.current.scale.set(scale, scale, scale);
    }
  }, [size.width]);

  const jupiterSize = getJupiterSize();
  const textScale = isMobile ? 1.5 : 2;
  const textPositionZ = isMobile ? 1.8 : 2.5;
  
  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Main Jupiter sphere */}
      <mesh 
        ref={jupiterRef} 
        material={material} 
        castShadow
        scale={[jupiterSize, jupiterSize, jupiterSize]}
      >
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      
      {/* Simple "Click Me" text */}
      <group position={[0, 0, textPositionZ]}>
        <sprite scale={[textScale, textScale/2, 1]} renderOrder={1}>
          <spriteMaterial 
            color="#64c8ff" 
            transparent 
            opacity={0.9}
            depthTest={false}
          >
            <canvasTexture
              attach="map"
              image={(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 128;
                const ctx = canvas.getContext('2d');
                
                ctx.fillStyle = '#64c8ff';
                ctx.font = 'Bold 50px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('CLICK ME', canvas.width / 2, canvas.height / 2);
                
                return canvas;
              })()}
            />
          </spriteMaterial>
        </sprite>
      </group>
    </group>
  );
});

JupiterModel.displayName = 'JupiterModel';

export default JupiterModel;
