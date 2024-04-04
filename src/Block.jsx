import React, { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export default function Suspense({ args, setArgs }) {
    const { size } = useThree();

    const isMobile = size.width <= 768;
    const [fontSize, setFontSize] = useState(0.5);

    useEffect(() => {
        setFontSize(isMobile ? 0.55 : 1.0);
    }, [size, isMobile, setFontSize]);

    

    return (
        <>
            <group position={[0, 0, 0]}>
                <Text color="white" fontSize={fontSize} position={[0, 0, 0]} children="Loading Party..." />

                <mesh position={[0, -2, 0]}>
                    <boxGeometry args={args} />
                    <meshStandardMaterial color="white" wireframe />
                </mesh>
            </group>
        </>
    )
}