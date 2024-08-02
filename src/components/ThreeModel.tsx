import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Model = ({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  url: string;
  scale: number;
  position: number[];
  rotation: number[];
}) => {
  const group = useRef(null);
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      // モデルのバウンディングボックスを計算
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());

      // モデルの中心を原点に移動
      scene.position.sub(center);
    }
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      // Y軸方向の浮き沈み
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.6;

      // オプション: 緩やかな回転を追加
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={scene} position={position} rotation={rotation} />
    </group>
  );
};

// const Cube = () => {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
//       meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
//     }
//   });

//   return (
//     <motion.mesh
//       ref={meshRef}
//       initial={{ scale: 0, y: -5 }}
//       animate={{ scale: 1, y: 0 }}
//       transition={{
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//         delay: 0.5,
//         duration: 1,
//       }}
//       whileHover={{ scale: 1.2 }}
//       whileHover-transition={{
//         type: "spring",
//         stiffness: 300,
//         damping: 20,
//         duration: 0.2,
//       }}
//       castShadow
//       receiveShadow
//     >
//       <boxGeometry args={[4.4, 4.4, 4.4]} />
//       <meshStandardMaterial color="orange" roughness={0} metalness={1.5} />
//     </motion.mesh>
//   );
// };

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
        <ambientLight intensity={1.8} />
        <directionalLight intensity={5} position={[0, 2, 2]} castShadow />
        {/* <Cube /> */}
        <Model
          url="/src/assets/models/scene.gltf"
          scale={2.34}
          position={[3, 1.3, 1.4]}
          rotation={[Math.PI / 10, 0, Math.PI / 6]}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeModel;
