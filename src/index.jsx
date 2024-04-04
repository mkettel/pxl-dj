import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from '/ui/Overlay.jsx'
import { PlayerProvider } from './PlayerContext';
import Rsvp from './Rsvp.jsx'



const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <PlayerProvider>
            <Canvas
             camera={{ position: [0, 0, 15], fov: 70 }}
            >
                <Experience />
            </Canvas>
            <Overlay />
            <Rsvp />
        </PlayerProvider>
    </>
)