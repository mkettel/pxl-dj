import { OrbitControls, Environment, CameraControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Turntable } from './models/Turntable'
import { useRef, useEffect } from 'react'

export default function Experience()
{
    const controls = useRef()
    const meshFitCameraHome = useRef()

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


    return <>

        {/* <Perf position="top-left" /> */}

        {/* <OrbitControls makeDefault /> */}
        <CameraControls ref={controls} />

        <directionalLight castShadow position={ [ 1, 4, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1 } />

        <Environment preset="apartment"  />

        <mesh ref={meshFitCameraHome} position={[0, .5, 0]}>
            <boxGeometry args={ [ 6.8, 3, 3 ] } />
            <meshStandardMaterial color="hotpink" transparent opacity={0} />
        </mesh>
        <Turntable position={ [ 0, 0, 0 ] } scale={1.7} rotation={[-0.4, 0, 0]} />

    </>
}