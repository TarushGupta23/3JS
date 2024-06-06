import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
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
                scale={isMobile? 0.3 : 0.75}
                position={isMobile? [0, -3, -2.2] : [ 0, -3.25, -1.510 ]}
                rotation={[ -0.01, -.2, -.1 ]}
            />
        </mesh>
    )
}

const ComputerCanvas = () => {
    const [isMoble, setIsMobile] = useState(false); // to check if screen width is < 500px
    useEffect(() => {
        // add event listener which changes with screen size
        const mediaQuery = window.matchMedia('(max-width: 500px)')

        //set initial value of state listener
        setIsMobile(mediaQuery.matches) // check and update value 

        // define callback function to handle changes
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
            alert(isMoble)
        }

        // add callback function as eventlistener
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return () => {
            // remove the listener when component is unmounted
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, [])
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

                <Computers isMoble={isMoble}/>

            </Suspense>
            <Preload all />

        </Canvas>
    )
}

export default ComputerCanvas