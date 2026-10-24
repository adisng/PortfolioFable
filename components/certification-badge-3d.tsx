'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  useGLTF,
  ContactShadows,
  Center,
} from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Group } from 'three'

function BadgeModel({ scale = 1.25 }: { scale?: number }) {
  const { scene } = useGLTF('/models/certification-badge.glb')
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    // Subtle, gentle tilt with reduced sensitivity
    const targetX = -state.pointer.y * 0.14 // subtle vertical tilt
    const targetY = state.pointer.x * 0.18  // subtle horizontal turn towards cursor
    const targetZ = -state.pointer.x * 0.04 // barely noticeable roll

    // Smooth lerp damping for calm, elegant motion
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/certification-badge.glb')

export default function CertificationBadge3D({
  className = 'h-56 w-full sm:h-64',
  scale = 1.25,
}: {
  className?: string
  scale?: number
}) {
  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 6, 4]} intensity={1.6} />
          <directionalLight position={[-5, -2, -2]} intensity={0.6} color="#ff7a1a" />
          <pointLight position={[0, 2, 3]} intensity={1.2} />

          <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
            <BadgeModel scale={scale} />
          </Float>

          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.35}
            scale={4.5}
            blur={2.4}
            far={3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
