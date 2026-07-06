'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import { Color, type Group, type Mesh } from 'three'
import { useTheme } from 'next-themes'

function Monolith() {
  const group = useRef<Group>(null)
  const inner = useRef<Mesh>(null)
  const { resolvedTheme } = useTheme()
  const bg = useMemo(
    () => new Color(resolvedTheme === 'dark' ? '#0d0d0d' : '#f7f4ec'),
    [resolvedTheme],
  )

  useFrame((state, delta) => {
    if (!group.current) return
    // Gentle idle rotation
    group.current.rotation.y += delta * 0.15
    // Cursor-reactive tilt (eased)
    const targetX = state.pointer.y * 0.25
    const targetZ = state.pointer.x * 0.2
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.05
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.3
      inner.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={group} scale={0.85} position={[0, 0.15, 0]}>
      {/* Liquid glass outer form */}
      <mesh>
        <icosahedronGeometry args={[1.35, 0]} />
        <MeshTransmissionMaterial
          background={bg}
          thickness={0.5}
          roughness={0.12}
          transmission={1}
          ior={1.35}
          chromaticAberration={0.03}
          clearcoat={1}
          attenuationDistance={3}
          attenuationColor="#ffb347"
        />
      </mesh>
      {/* Warm metallic core */}
      <mesh ref={inner} scale={0.55}>
        <torusKnotGeometry args={[0.55, 0.2, 128, 24]} />
        <meshStandardMaterial
          color="#ff6a13"
          metalness={0.9}
          roughness={0.25}
          emissive="#e65a00"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
        eventSource={
          typeof document !== 'undefined' ? document.body : undefined
        }
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 3]} intensity={1.1} />
          <pointLight position={[-4, -2, -3]} intensity={2} color="#ff6a13" />
          <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.9}>
            <Monolith />
          </Float>
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.35}
            scale={9}
            blur={2.6}
            far={3.2}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
