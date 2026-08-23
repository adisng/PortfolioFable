'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

type SceneType = 'icosahedron' | 'network' | 'card' | 'parallax'

function Icosahedron() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.002
    ref.current.rotation.y += 0.004
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.8, 0.04)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.5, 0.04)
  })
  return <mesh ref={ref} scale={2.7}><icosahedronGeometry args={[1, 2]} /><meshBasicMaterial color="var(--accent)" wireframe transparent opacity={0.8} /></mesh>
}

function Network() {
  const group = useRef<THREE.Group>(null)
  const nodes = [-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => [x, Math.sin(i) * 1.4, 0] as const)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.08
    group.current.rotation.x = state.pointer.y * 0.12
  })
  return <group ref={group}>{nodes.map(([x, y, z], i) => <mesh key={i} position={[x, y, z]}><sphereGeometry args={[0.12, 12, 12]} /><meshBasicMaterial color="var(--accent)" /></mesh>)}<lineSegments><edgesGeometry args={[new THREE.BoxGeometry(4.8, 2.2, 0.1)]} /><lineBasicMaterial color="var(--foreground)" transparent opacity={0.4} /></lineSegments></group>
}

function CardScene() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.pointer.x * 0.35 + Math.sin(state.clock.elapsedTime) * 0.08
    ref.current.rotation.x = -state.pointer.y * 0.18
  })
  return <mesh ref={ref} rotation={[0, -0.3, 0]}><planeGeometry args={[3.8, 5.4]} /><meshBasicMaterial color="var(--accent)" wireframe transparent opacity={0.6} /></mesh>
}

function Parallax() {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.position.x = state.pointer.x * 0.4
    group.current.position.y = state.pointer.y * 0.25
  })
  return <group ref={group}>{[0, 1, 2].map((i) => <mesh key={i} position={[i * 0.55 - 0.6, i * 0.35 - 0.35, i * -0.5]} scale={1 + i * 0.35}><planeGeometry args={[2.5, 1.7]} /><meshBasicMaterial color={i === 1 ? 'var(--accent)' : 'var(--foreground)'} wireframe transparent opacity={0.28} /></mesh>)}</group>
}

function Scene({ type }: { type: SceneType }) {
  return <><ambientLight intensity={0.3} />{type === 'icosahedron' && <Icosahedron />}{type === 'network' && <Network />}{type === 'card' && <CardScene />}{type === 'parallax' && <Parallax />}<Environment preset="night" /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /></>
}

export function CaseStudy3D({ type }: { type: SceneType }) {
  return <div className="pointer-events-none absolute inset-0 z-0 opacity-35" aria-hidden="true"><Canvas camera={{ position: [0, 0, 8], fov: 42 }} dpr={[1, 1.5]}><Scene type={type} /></Canvas></div>
}
