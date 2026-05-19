import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatShapes() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#8b5cf6" />
            <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#06b6d4" />

            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <Sphere args={[1, 64, 64]} position={[-2, 1, -1]}>
                    <MeshDistortMaterial
                        color="#8b5cf6"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
                <Sphere args={[0.8, 64, 64]} position={[2, -1, 1]}>
                    <MeshDistortMaterial
                        color="#06b6d4"
                        attach="material"
                        distort={0.5}
                        speed={3}
                        roughness={0.1}
                        metalness={0.9}
                    />
                </Sphere>
            </Float>

            {/* Background Particles could go here */}
        </>
    );
}
