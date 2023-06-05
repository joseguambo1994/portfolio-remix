import { OrbitControls, useCubeTexture } from "@react-three/drei";
import { Canvas, Vector3, useThree } from "@react-three/fiber";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import { Model } from "./components";
import { Suspense, useRef, useState, useEffect } from "react";
import { Astronaut } from "./components/astronaut";
import { RobotAnimated } from "./components/robotAnimated";
import Particles from "./components/particle";
import PersonalData from "./components/personalData";



export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

const getBox = () =>{
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 28 }}>
    <color attach="background" args={['#151520']} />
    <directionalLight position={[-2.5, 4, 5]} castShadow intensity={1} shadow-bias={-0.00001} shadow-mapSize={[1024, 1024]} />
    <group position={[0, -0.75, 0]}>
      <boxGeometry position={[0, 0, 1.5]} scale={0.75} rotation={[0, 0.85, 0]} />
      <mesh receiveShadow rotation-x={-Math.PI / 2} scale={1} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="pink" envMapIntensity={0.5} roughness={0} metalness={0} />
      </mesh>
    </group>
    <OrbitControls />
  </Canvas>
  )
}

const getModel = () =>{
  return (
    <Canvas>
      
    <Suspense fallback={<Meta />}>
    <directionalLight position={[-2.5, 4, 5]} />

      <Model />
      <OrbitControls />
    </Suspense>
  </Canvas>
  )
}


const Skybox = () => {
  const {scene} = useThree();
  const envMap = useCubeTexture([
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    
], { path: '/' })
scene.background = envMap
return null
}

const superScene= () =>{
  const [position, setPosition] = useState<Vector3>([3,3,3]); 
 
  
  return <>
   <ambientLight intensity={0.5} />
      <directionalLight position={[-2.5, 4, 5]} />
      <Skybox />
      <Particles />
      <RobotAnimated  />
      <PersonalData position={[2, 2, 2]} onPress={()=> {
        setPosition(position);
       
      }} />
      <OrbitControls  scale={position}
      />
  </>

}

const getSkybox = () =>{
 
  
  return (
    <Canvas >  
       {superScene()}
    </Canvas>
  )
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {
          getSkybox()
        }
        {
        getBox()
      }
      {
        getModel()
      }
      
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
