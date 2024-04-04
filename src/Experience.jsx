import { OrbitControls, Environment, CameraControls, useProgress } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Turntable } from './models/Turntable'
import { useRef, useEffect, useState, Suspense, useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import Block from './Block'
import { CompressedTurn } from './models/CompressedTurn'
import DiscoShaderMaterial from './BGShader'
import { easing } from 'maath'

export default function Experience()
{
    const controls = useRef()
    const meshFitCameraHome = useRef()
    const { size } = useThree()
    const isMobile = size.width <= 768;
    const args = useMemo(() => (isMobile ? [7, 2, 5] : [15, 2, 5]), [isMobile]);
    const position = useMemo(() => (isMobile ? [0, 0, 2.7] : [0, 0, 0]), [isMobile]);
    const cameraBoxSize = useMemo(() => (isMobile ? [3.7, 3, 4] : [7.2, 3, 3]), [isMobile]);
    const cameraBoxPosition = useMemo(() => (isMobile ? [2.5, 0.5, 1.4] : [0, 0.5, 0]), [isMobile]);
    const { progress } = useProgress()
    

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
        if (progress === 100) {
            intro();
        }
    }, [progress])

    useEffect(() => {
        window.addEventListener('resize', fitCameraHome)
        return () => window.removeEventListener('resize', fitCameraHome)
    })

    // useEffect(() => {
    //     // Update the position based on the screen size
    //     // const isMobile = size.width <= 768;
    //     setPosition(isMobile ? [0, 0, 2.7] : [0, 0, 0]);
    //     setArgs(isMobile ? [7, 2, 5] : [15, 2, 5]);
    //     setCameraBoxSize(isMobile ? [3.7, 3, 4] : [7.2, 3, 3]);
    //     setCameraBoxPosition(isMobile ? [2.5, .5, 1.4] : [0, 0.5, 0]);
    //   }, [size, isMobile, setPosition, setArgs, setCameraBoxSize, setCameraBoxPosition]);  


    return <>

        {/* <Perf position="top-left" /> */}

        {/* <OrbitControls makeDefault /> */}
        {/* <CameraControls ref={controls} minDistance={3.4} maxDistance={13} minPolarAngle={-5} maxPolarAngle={0.1} minAzimuthAngle={-0.05} maxAzimuthAngle={0.01} /> */}
        <CameraControls ref={controls} />

        <ambientLight intensity={ 2 } />

        <Environment preset="apartment" />

        <mesh ref={meshFitCameraHome} position={cameraBoxPosition}>
            <boxGeometry args={ cameraBoxSize } />
            <meshStandardMaterial color="hotpink" transparent opacity={0.0} />
        </mesh>


        <Suspense fallback={<Block args={args}  />}>
            {/* {isMobile ? <CompressedTurn position={position} scale={1.7} rotation={[-0.2, 0, 0]} /> : <Turntable position={position} scale={1.7} rotation={[-0.4, 0, 0]} />} */}
            <Turntable position={position} scale={1.7} rotation={[-0.4, 0, 0]} />
            {/* <CompressedTurn position={position} scale={1.7} rotation={[0, 0, 0]} /> */}
        </Suspense>

        <mesh rotation={[1.7, 0, 0]} position={[0, 0, -5]}>
            <sphereGeometry args={[30, 30]} />
            <DiscoShaderMaterial />
        </mesh>

    </>
}


