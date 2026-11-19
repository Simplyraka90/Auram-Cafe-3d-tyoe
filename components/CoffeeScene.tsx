'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Steam({offset=0}:{offset?:number}){
 const ref=useRef<THREE.Group>(null);
 useFrame(({clock})=>{
  if(!ref.current)return;
  const t=(clock.elapsedTime*.26+offset)%1;
  ref.current.position.y=1.02+t*1.85;
  ref.current.position.x=Math.sin(t*9+offset*8)*.14;
  ref.current.scale.setScalar(.5+t*.65);
  ref.current.rotation.z=Math.sin(t*5+offset)*.16;
  ref.current.children.forEach(child=>{
   const mesh=child as THREE.Mesh;
   const mat=mesh.material as THREE.MeshBasicMaterial;
   mat.opacity=(1-t)*.26;
  });
 });
 return <group ref={ref} position={[0,1,0]}><mesh rotation={[0,0,.2]}><torusGeometry args={[.22,.035,8,48,Math.PI*1.4]}/><meshBasicMaterial color="#b49a69" transparent opacity={.18} depthWrite={false}/></mesh></group>;
}
function Cup(){
 const group=useRef<THREE.Group>(null);
 useFrame(({clock},delta)=>{
  if(group.current){group.current.rotation.y+=delta*.12;group.current.rotation.z=Math.sin(clock.elapsedTime*.7)*.035;}
 });
 return <group ref={group} rotation={[.1,-.35,0]}>
  <mesh position={[0,-.16,0]} castShadow receiveShadow><cylinderGeometry args={[1.05,.73,1.7,96]}/><meshPhysicalMaterial color="#fff9e8" roughness={.16} metalness={.04} clearcoat={1} clearcoatRoughness={.08}/></mesh>
  <mesh position={[0,.69,0]}><torusGeometry args={[1.05,.066,16,96]}/><meshStandardMaterial color="#c89c46" metalness={.83} roughness={.18}/></mesh>
  <mesh position={[0,.691,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.998,96]}/><meshStandardMaterial color="#402214" roughness={.26}/></mesh>
  <mesh position={[0,.705,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.59,.055,12,96]}/><meshStandardMaterial color="#b78046" roughness={.46}/></mesh>
  <mesh position={[0,.71,.02]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.36,.036,12,96]}/><meshStandardMaterial color="#e4c4a0" roughness={.5}/></mesh>
  <mesh position={[1.13,-.13,0]} rotation={[0,0,Math.PI/2]} castShadow><torusGeometry args={[.55,.16,20,80]}/><meshPhysicalMaterial color="#fff5d9" roughness={.2} metalness={.08} clearcoat={1}/></mesh>
  <mesh position={[0,-1.12,0]} castShadow receiveShadow><cylinderGeometry args={[1.43,1.3,.13,96]}/><meshPhysicalMaterial color="#fff5dd" roughness={.22} metalness={.13}/></mesh>
  <mesh position={[0,-1.19,0]}><torusGeometry args={[1.28,.026,10,96]}/><meshStandardMaterial color="#c99c4a" metalness={.8} roughness={.2}/></mesh>
  <mesh position={[0,-.3,1.0]}><torusGeometry args={[.35,.014,8,80]}/><meshStandardMaterial color="#d7ae62" metalness={.75} roughness={.24}/></mesh>
  <Steam offset={0}/><Steam offset={.36}/><Steam offset={.72}/>
 </group>;
}
function Bean({position,scale=1}:{position:[number,number,number];scale?:number}){
 return <Float speed={1.7} floatIntensity={.8} rotationIntensity={.8}>
 <group position={position} scale={scale} rotation={[.3,.2,.65]}>
  <mesh castShadow scale={[.7,1.15,.48]}><sphereGeometry args={[.33,24,20]}/><meshStandardMaterial color="#6b3a20" roughness={.47}/></mesh>
  <mesh position={[0,0,.155]} rotation={[0,0,.16]}><boxGeometry args={[.035,.57,.015]}/><meshStandardMaterial color="#2b170f" roughness={1}/></mesh>
 </group></Float>;
}
function Halo(){
 const ref=useRef<THREE.Group>(null);
 useFrame((_,d)=>{if(ref.current)ref.current.rotation.z+=d*.07});
 return <group ref={ref}>
 <mesh rotation={[.18,.3,.15]}><torusGeometry args={[2.05,.018,8,160]}/><meshBasicMaterial color="#d7ac5b" transparent opacity={.56}/></mesh>
 <mesh rotation={[.6,.9,-.2]}><torusGeometry args={[2.5,.012,8,160]}/><meshBasicMaterial color="#c9a45d" transparent opacity={.26}/></mesh>
 </group>;
}
export default function CoffeeScene(){
 const positions=useMemo<[number,number,number][]>(()=>[[-1.8,1.45,.4],[2,1.1,-.5],[1.9,-1.35,.8],[-2.1,-.95,-.3]],[]);
 return <div className="h-full w-full min-h-0" role="img" aria-label="Interactive three dimensional coffee cup with animated steam, floating coffee beans and golden orbital rings">
 <Canvas shadows dpr={[1,1.5]} camera={{position:[0,.65,6.3],fov:42}} gl={{alpha:true,antialias:true}} fallback={<div>3D is not supported by this browser.</div>}>
 <ambientLight intensity={1.9}/><directionalLight castShadow position={[4,7,5]} intensity={3.2} color="#fff0c8"/><pointLight position={[-4,2,3]} intensity={25} color="#e7bd72"/>
 <Halo/><Float speed={1.1} floatIntensity={.25} rotationIntensity={.06}><Cup/></Float>
 {positions.map((pos,i)=><Bean key={i} position={pos} scale={i%2?.75:1}/>)}
 <ContactShadows position={[0,-1.62,0]} opacity={.24} scale={8} blur={2.8} far={4}/>
 <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.35} minPolarAngle={.8} maxPolarAngle={2.15}/>
 </Canvas></div>;
}
