

export default function Suspense() {

    return (
        <>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[15, 2, 5]} />
                <meshStandardMaterial color="hotpink" wireframe />
            </mesh>
        </>
    )
}