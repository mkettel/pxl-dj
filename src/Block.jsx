import React, { useState, useEffect } from 'react';

export default function Suspense({ args, setArgs }) {
    

    return (
        <>
            <mesh position={[0, -2, 0]}>
                <boxGeometry args={args} />
                <meshStandardMaterial color="hotpink" wireframe />
            </mesh>
        </>
    )
}