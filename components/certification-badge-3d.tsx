'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  PresentationControls,
  useGLTF,
  ContactShadows,
  Center,
} from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Group } from 'three'

function BadgeModel({ scale = 1.6 }: { scale?: number }) {
  const { scene } = useGLTF('/models/certification-badge.glb')
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle idle spin
      groupRef.current.rotation.y += delta * 0.4
    }
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
  className = 'h-72 w-full sm:h-80',
  scale = 1.6,
}: {
  className?: string
  scale?: number
}) {
  return (
    <div className={`relative ${className} select-none touch-none`}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 6, 4]} intensity={1.5} />
          <directionalLight position={[-5, -2, -2]} intensity={0.6} color="#ff7a1a" />
          <pointLight position={[0, 2, 3]} intensity={1.2} />

          <PresentationControls
            global={false}
            cursor={true}
            snap={true}
            speed={2}
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI, Math.PI]}
          >
            <Float speed={2} rotationIntensity={0.25} floatIntensity={0.6}>
              <BadgeModel scale={scale} />
            </Float>
          </PresentationControls>

          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.4}
            scale={5}
            blur={2.4}
            far={3}
          />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
        [ Drag to rotate 3D badge ]
      </div>
    </div>
  )
}
