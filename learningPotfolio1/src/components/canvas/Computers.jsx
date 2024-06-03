import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader';

const Computers = () => {
    const computer = useGLTF('./desktop_pc/scene.gltf')
    return (
        <mesh>
            <hemisphereLight intensity={3} groundColor="black" />
            <pointLight intensity={1} />
            <spotLight
                position={[-20, 50, 10]} 
                angle={0.12} 
                penumbra={1} 
                intensity={1} 
                castShadow
                shadow-mapSize={1024}
            />

            <primitive 
                object={computer.scene} 
                scale={0.75}
                position={[ 0, -3.25, -1.510 ]}
                rotation={[ -0.01, -.2, -.1 ]}
            />
        </mesh>
    )
}

const ComputerCanvas = () => {
    return (
        <Canvas 
            frameloop='demand' 
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }} // fov : field of view, position: [x, y, z]
            gl={{ preserveDrawingBuffer: true }} // need for proper rendering
            >
            
            <Suspense fallback={<CanvasLoader/>}> {/* provides a loader while our modle is loading... */}
                <OrbitControls // set controls for our model
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    enableZoom={false} />

                <Computers />

            </Suspense>
            <Preload all />

        </Canvas>
    )
}

export default ComputerCanvas