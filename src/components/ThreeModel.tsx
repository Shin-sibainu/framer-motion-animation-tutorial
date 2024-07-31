import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Model = ({ url, scale = 1, position = [0, 0, 0] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, materials } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // マテリアルが存在する場合、それを使用
        if (child.material) {
          // PBRマテリアルの場合、環境マップを設定
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMapIntensity = 1;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [scene, materials]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <motion.group
      ref={groupRef}
      scale={scale}
      position={position}
      initial={{ scale: 0, y: -5 }}
      animate={{ scale: scale, y: position[1] }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.5,
        duration: 1,
      }}
      whileHover={{ scale: scale * 1.2 }}
      whileHover-transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2,
      }}
    >
      <primitive object={scene} />
    </motion.group>
  );
};

const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <motion.mesh
      ref={meshRef}
      initial={{ scale: 0, y: -5 }}
      animate={{ scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.5,
        duration: 1,
      }}
      whileHover={{ scale: 1.2 }}
      whileHover-transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2,
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[4.4, 4.4, 4.4]} />
      <meshStandardMaterial color="orange" roughness={0} metalness={1.5} />
    </motion.mesh>
  );
};

// const TorusKnot = () => {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
//       meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
//     }
//   });

//   return (
//     <motion.mesh
//       ref={meshRef}
//       initial={{ scale: 0, y: 5 }}
//       animate={{ scale: 1, y: 0 }}
//       transition={{
//         type: "spring",
//         stiffness: 50,
//         damping: 10,
//         delay: 1,
//       }}
//       whileHover={{ scale: 1.2 }}
//       whileTap={{ scale: 0.9 }}
//     >
//       <torusKnotGeometry args={[1, 0.3, 100, 16]} />
//       <meshPhongMaterial
//         color="blue"
//         emissive="blue"
//         emissiveIntensity={0.5}
//         specular="white"
//         shininess={100}
//       />
//     </motion.mesh>
//   );
// };

const ThreeModel = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        {/* <pointLight
          intensity={3.5}
          position={[2, 3.3, 2]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        /> */}
        <directionalLight intensity={2} position={[0, 2, 2]} castShadow />
        {/* <Cube /> */}
        <Model
          url="/src/assets/models/scene.gltf"
          scale={7}
          position={[0, 0, 0]}
        />

        {/* <TorusKnot /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeModel;
