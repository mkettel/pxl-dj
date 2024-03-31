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
                
            >
                <Experience />
            </Canvas>
            <Overlay />
        </PlayerProvider>
    </>
)