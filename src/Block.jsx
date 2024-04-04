import React, { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';

export default function Suspense({ args, setArgs }) {
    

    return (
        <>
            <group position={[0, 0, 0]}>
                <Text color="red" fontSize={1.0} position={[0, 0, 0]} children="Loading Party..." strokeWidth={2} />

                <mesh position={[0, -2, 0]}>
                    <boxGeometry args={args} />
                    <meshStandardMaterial color="hotpink" wireframe />
                </mesh>
            </group>
        </>
    )
}