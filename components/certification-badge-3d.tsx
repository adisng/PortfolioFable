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

// Clamp helper to strictly prevent large rotation angles (max ~6-8 degrees)
function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

function BadgeModel({ scale = 1.25 }: { scale?: number }) {
  const { scene } = useGLTF('/models/certification-badge.glb')
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    // Very gentle micro-tilt, strictly clamped to max ±0.1 rad (~5.7 degrees)
    // It can never turn around or rotate 360
    const targetX = clamp(-state.pointer.y * 0.08, -0.09, 0.09) // tiny vertical tilt
    const targetY = clamp(state.pointer.x * 0.1, -0.12, 0.12)   // tiny horizontal turn
    const targetZ = clamp(-state.pointer.x * 0.02, -0.03, 0.03) // micro roll

    // Smooth lerp damping
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.06
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.06
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.06
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

          {/* Locked rotation on Float so it cannot spin on its own */}
          <Float speed={1} rotationIntensity={0} floatIntensity={0.25}>
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
