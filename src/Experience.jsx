import { OrbitControls, Environment, CameraControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Turntable } from './models/Turntable'

export default function Experience()
{
    return <>

        {/* <Perf position="top-left" /> */}

        {/* <OrbitControls makeDefault /> */}
        <CameraControls />

        <directionalLight castShadow position={ [ 1, 4, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1 } />

        <Environment preset="apartment"  />

        <Turntable position={ [ 0, 0, 0 ] } scale={1.7} rotation={[0, 0.61, 0]} />

    </>
}