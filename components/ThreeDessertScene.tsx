'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Float,OrbitControls,ContactShadows} from '@react-three/drei';
import {useRef} from 'react';
import * as THREE from 'three';
function Cake(){const ref=useRef<THREE.Group>(null);useFrame((_,d)=>{if(ref.current)ref.current.rotation.y+=d*.16});return <group ref={ref}>
<mesh position={[0,-1,0]}><cylinderGeometry args={[1.9,1.9,.15,64]}/><meshStandardMaterial color="#e6d2b8" metalness={.35} roughness={.24}/></mesh>
<mesh position={[0,-.44,0]} castShadow><cylinderGeometry args={[1.25,1.35,1,64]}/><meshStandardMaterial color="#59321f" roughness={.7}/></mesh>
<mesh position={[0,.12,0]}><cylinderGeometry args={[1.28,1.25,.15,64]}/><meshStandardMaterial color="#b9805e" roughness={.45}/></mesh>
{Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return <mesh key={i} position={[Math.cos(a)*.92,.23,Math.sin(a)*.92]} scale={[.23,.12,.23]}><sphereGeometry args={[1,18,12]}/><meshStandardMaterial color="#f5d6b0"/></mesh>})}
<mesh position={[0,.4,0]}><sphereGeometry args={[.35,24,24]}/><meshStandardMaterial color="#fff4dc"/></mesh>
<mesh position={[.15,.75,.1]}><sphereGeometry args={[.15,18,18]}/><meshStandardMaterial color="#9c252b"/></mesh>
</group>}
export default function ThreeDessertScene(){return <div className="h-full w-full" role="img" aria-label="Rotating 3D chocolate cake"><Canvas dpr={[1,1.5]} camera={{position:[0,1.6,5.7],fov:42}} gl={{alpha:true}}><ambientLight intensity={1.6}/><directionalLight position={[3,5,5]} intensity={3} color="#ffe8cb"/><pointLight position={[-3,1,2]} intensity={15} color="#dca16a"/><Float speed={1.2} floatIntensity={.2}><Cake/></Float><ContactShadows position={[0,-1.5,0]} opacity={.22} scale={6} blur={2.5}/><OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={.4}/></Canvas></div>}
