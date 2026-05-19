import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils } from 'three';

function ParallaxShapes() {
    const group = useRef();

    useFrame((state, delta) => {
        // Calculate a scroll factor based on window.scrollY
        const scrollY = window.scrollY;

        // Smoothly interpolate the group's Y position to move opposite to scroll (parallax)
        // 0.005 controls the parallax speed.
        group.current.position.y = MathUtils.lerp(group.current.position.y, scrollY * 0.005, 0.1);

        // Constant slow rotation for the ambient feel
        group.current.rotation.y += delta * 0.1;
        group.current.rotation.x += delta * 0.05;
    });

    return (
        <group ref={group}>
            <mesh position={[-4, 3, -5]} rotation={[0.5, 0.5, 0]}>
                <octahedronGeometry args={[1.5, 0]} />
                <meshPhysicalMaterial color="#06b6d4" wireframe transparent opacity={0.6} />
            </mesh>

            <mesh position={[5, -2, -8]} rotation={[0.2, 0.8, -0.3]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshPhysicalMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
            </mesh>

            <mesh position={[-3, -5, -6]} rotation={[1, 0, 0.5]}>
                <torusGeometry args={[1.5, 0.4, 16, 32]} />
                <meshPhysicalMaterial color="#ffffff" wireframe transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

export default function ParallaxBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ParallaxShapes />
            </Canvas>
        </div>
    );
}
