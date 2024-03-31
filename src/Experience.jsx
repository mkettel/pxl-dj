import { OrbitControls, Environment, CameraControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Turntable } from './models/Turntable'
import { useRef, useEffect, useState, Suspense } from 'react'
import { useThree } from '@react-three/fiber'
import Block from './Block'

export default function Experience()
{
    const controls = useRef()
    const meshFitCameraHome = useRef()
    const { size } = useThree()
    const [position, setPosition] = useState([0, 0, 0])
    const [args, setArgs] = useState([15, 2, 5])

    const intro = async () => {
        controls.current.rotate(0.6, -1, true)
        controls.current.dolly(-10)
        controls.current.smoothTime = 1.6;
        fitCameraHome();
        console.log(controls.current);
    }

    const fitCameraHome = async () => {
        controls.current.fitToBox(meshFitCameraHome.current, true)
    }

    useEffect(() => {
        intro();
    }, [])

    useEffect(() => {
        window.addEventListener('resize', fitCameraHome)
        return () => window.removeEventListener('resize', fitCameraHome)
    })

    useEffect(() => {
        // Update the position based on the screen size
        const isMobile = size.width <= 768;
        setPosition(isMobile ? [0, 0, 1] : [0, 0, 0]);
        setArgs(isMobile ? [3, 2, 5] : [15, 2, 5]);
      }, [size]);  


    return <>

        {/* <Perf position="top-left" /> */}

        {/* <OrbitControls makeDefault /> */}
        <CameraControls ref={controls} minDistance={3.4} maxDistance={13} minPolarAngle={-5} maxPolarAngle={0.1} minAzimuthAngle={-0.05} maxAzimuthAngle={0.01} />

        <directionalLight castShadow position={ [ 1, 4, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1 } />

        <Environment preset="apartment"  />

        <mesh ref={meshFitCameraHome} position={[0, .5, 0]}>
            <boxGeometry args={ [ 7.2, 3, 3 ] } />
            <meshStandardMaterial color="hotpink" transparent opacity={0} />
        </mesh>


        <Suspense fallback={<Block args={args} setArgs={setArgs}  />}>
            <Turntable position={position} scale={1.7} rotation={[-0.4, 0, 0]} />
        </Suspense>

    </>
}