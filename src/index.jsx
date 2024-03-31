import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from '/ui/Overlay.jsx'
import { PlayerProvider } from './PlayerContext';



const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <PlayerProvider>
            <Canvas
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 4, 2, 6 ]
                } }
            >
                <Experience />
            </Canvas>
            <Overlay />
        </PlayerProvider>
    </>
)