'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

type ThreeSceneType = 'icosahedron' | 'network' | 'card' | 'parallax' | 'documents' | 'torusknot'

interface ThreeSceneProps {
  type: ThreeSceneType
}

function IcosahedronScene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const target = useMemo(() => new THREE.Vector3(), [])
  const current = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.15
    meshRef.current.rotation.y += delta * 0.25

    target.lerp(state.pointer.clone().multiplyScalar(0.5), 0.02)
    current.lerp(target, 0.1)
    meshRef.current.position.lerp(current, 0.05)
  })

  return (
    <mesh ref={meshRef} scale={1.5} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color="#ff6a13"
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function NetworkScene() {
  const nodesRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const pulsePhase = useRef(0)

  useFrame((_, delta) => {
    pulsePhase.current += delta * 2
    const pulse = Math.sin(pulsePhase.current) * 0.3 + 0.7

    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 0.05
      nodesRef.current.rotation.x += delta * 0.03
      ;(nodesRef.current.material as THREE.PointsMaterial).size = 0.04 * pulse
    }
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.05
      linesRef.current.rotation.x += delta * 0.03
      ;(linesRef.current.material as THREE.LineBasicMaterial).opacity = 0.3 * pulse
    }
  })

  const nodesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const count = 80
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const count = 80
    const positions = new Float32Array(count * 6)
    const positionsArray = (nodesGeometry.attributes.position as THREE.BufferAttribute).array
    for (let i = 0; i < count; i++) {
      const targetIdx = (i + 1 + Math.floor(Math.random() * 3)) % count
      positions[i * 6] = positionsArray[i * 3]
      positions[i * 6 + 1] = positionsArray[i * 3 + 1]
      positions[i * 6 + 2] = positionsArray[i * 3 + 2]
      positions[i * 6 + 3] = positionsArray[targetIdx * 3]
      positions[i * 6 + 4] = positionsArray[targetIdx * 3 + 1]
      positions[i * 6 + 5] = positionsArray[targetIdx * 3 + 2]
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [nodesGeometry])

  return (
    <group>
      <points ref={nodesRef} geometry={nodesGeometry}>
        <pointsMaterial color="#ff6a13" size={0.04} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#ff6a13" transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}

function CardScene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [flipped, setFlipped] = useState(false)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.1
    meshRef.current.rotation.x += delta * 0.05

    const targetRotation = flipped ? Math.PI : 0
    meshRef.current.rotation.y += (targetRotation - meshRef.current.rotation.y) * 0.1
  })

  const texture = useTexture('/images/project-neuraflow.png')

  useEffect(() => {
    texture.anisotropy = 16
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
  }, [texture])

  return (
    <group
      onPointerOver={() => setFlipped(true)}
      onPointerOut={() => setFlipped(false)}
    >
      <mesh ref={meshRef} scale={2} position={[0, 0, 0]}>
        <planeGeometry args={[1.4, 2, 1, 1]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function ParallaxScene() {
  const spriteRefs = useRef<THREE.Sprite[]>([])
  const depths = useMemo(() => [-4, -2.5, -1, 0.5, 2], [])

  useFrame((state) => {
    spriteRefs.current.forEach((sprite, i) => {
      const depth = depths[i]
      const parallaxFactor = 0.5 + depth * 0.1
      sprite.position.x = state.pointer.x * parallaxFactor
      sprite.position.y = -state.pointer.y * parallaxFactor
      sprite.position.z = depth
    })
  })

  const textures = useTexture([
    '/images/project-pulseboard.png',
    '/images/project-neuraflow.png',
  ])

  useMemo(() => {
    textures.forEach(t => {
      t.wrapS = THREE.RepeatWrapping
      t.wrapT = THREE.RepeatWrapping
    })
  }, [textures])

  return (
    <group>
      {depths.map((depth, i) => (
        <sprite
          key={i}
          ref={(el) => { if (el) spriteRefs.current[i] = el }}
          scale={depth < 0 ? [8, 6, 1] : [6, 4.5, 1]}
          position={[0, 0, depth]}
        >
          <spriteMaterial
            map={textures[i % textures.length]}
            transparent
            opacity={depth < 0 ? 0.4 : 0.25}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}

function DocumentsScene() {
  const docsRef = useRef<THREE.Mesh[]>([])
  const docData = useMemo(() => {
    const data = []
    for (let i = 0; i < 15; i++) {
      data.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 8 - 2,
        rotX: Math.random() * 0.3 - 0.15,
        rotY: Math.random() * 0.3 - 0.15,
        speed: 0.1 + Math.random() * 0.15,
      })
    }
    return data
  }, [])

  useFrame((_, delta) => {
    docsRef.current.forEach((mesh, i) => {
      const d = docData[i]
      mesh.position.y += Math.sin(performance.now() * 0.001 * d.speed + i) * delta * 0.5
      mesh.rotation.x += delta * 0.02
      mesh.rotation.y += delta * 0.03
    })
  })

  return (
    <group ref={docsRef}>
      {docData.map((d, i) => (
        <mesh
          key={i}
          position={[d.x, d.y, d.z]}
          rotation={[d.rotX, d.rotY, 0]}
          scale={0.6}
        >
          <planeGeometry args={[1, 1.4]} />
          <meshStandardMaterial
            color="#171717"
            metalness={0.1}
            roughness={0.7}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function TorusKnotScene() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.15
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.z += delta * 0.1
  })

  return (
    <mesh ref={meshRef} scale={1.2} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshBasicMaterial
        color="#ff6a13"
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

const sceneComponents: Record<ThreeSceneType, React.FC> = {
  icosahedron: IcosahedronScene,
  network: NetworkScene,
  card: CardScene,
  parallax: ParallaxScene,
  documents: DocumentsScene,
  torusknot: TorusKnotScene,
}

export function CaseStudy3DBackground({ type }: ThreeSceneProps) {
  const SceneComponent = sceneComponents[type]

  const isDark = typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  const bgColor = isDark ? '#0d0d0d' : '#f7f4ec'

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
            <SceneComponent />
          </Float>
        </Suspense>
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background: isDark ? 'rgba(13, 13, 13, 0.35)' : 'rgba(247, 244, 236, 0.35)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}