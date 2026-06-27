import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, MeshWobbleMaterial, Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────
   Shared mouse ref passed down as prop
   so we avoid per-component listeners
───────────────────────────────────────────── */

/* ── Perfume / Cosmetic Bottle ──────────────── */
function CosmeticBottle({ position, scale = 1, speed = 0.4, mouse }) {
  const group = useRef()
  const t = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    t.current += delta * speed
    if (!group.current) return
    group.current.rotation.y += delta * 0.3
    group.current.rotation.x = Math.sin(t.current * 0.5) * 0.08
    // mouse parallax — subtle lean toward cursor
    group.current.position.x = position[0] + mouse.current[0] * 0.15
    group.current.position.y = position[1] + Math.sin(t.current) * 0.12 + mouse.current[1] * 0.1
    group.current.position.z = position[2]
  })

  return (
    <group ref={group} scale={scale}>
      {/* Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.7, 20]} />
        <MeshWobbleMaterial
          color="#c9a84c"
          factor={0.05}
          speed={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.14, 0.22, 16]} />
        <meshStandardMaterial color="#e2c97e" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.12, 16]} />
        <meshStandardMaterial color="#f5f0e8" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Label face (flat disc) */}
      <mesh position={[0.19, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.14, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.6} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

/* ── Hair Scissors ──────────────────────────── */
function Scissors({ position, scale = 1, mouse }) {
  const group = useRef()
  const t = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    t.current += delta * 0.5
    if (!group.current) return
    group.current.rotation.z = Math.sin(t.current * 0.6) * 0.15
    group.current.rotation.x = Math.sin(t.current * 0.4) * 0.06
    group.current.position.y = position[1] + Math.sin(t.current * 0.8) * 0.14 + mouse.current[1] * 0.08
    group.current.position.x = position[0] + mouse.current[0] * 0.12
    group.current.position.z = position[2]
  })

  // Build blade shape procedurally
  const bladeShape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.lineTo(0.04, 0.06)
    s.lineTo(0.02, 0.55)
    s.lineTo(0, 0.58)
    s.lineTo(-0.02, 0.55)
    s.lineTo(-0.04, 0.06)
    s.closePath()
    return s
  }, [])

  const extrudeSettings = useMemo(() => ({ depth: 0.03, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 2 }), [])

  const SILVER = { color: '#d4d4d4', metalness: 0.95, roughness: 0.05 }
  const GOLD_M = { color: '#c9a84c', metalness: 0.9,  roughness: 0.1  }

  return (
    <group ref={group} scale={scale}>
      {/* Blade 1 */}
      <mesh position={[0.06, 0, 0]} castShadow>
        <extrudeGeometry args={[bladeShape, extrudeSettings]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      {/* Blade 2 — mirrored */}
      <mesh position={[-0.06, 0, 0]} rotation={[0, 0, Math.PI]} castShadow>
        <extrudeGeometry args={[bladeShape, extrudeSettings]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      {/* Pivot ring */}
      <mesh position={[0, 0.05, 0.015]} castShadow>
        <torusGeometry args={[0.06, 0.015, 12, 32]} />
        <meshStandardMaterial {...GOLD_M} />
      </mesh>
      {/* Handle loop 1 */}
      <mesh position={[0.1, -0.22, 0.015]} castShadow>
        <torusGeometry args={[0.09, 0.02, 10, 28]} />
        <meshStandardMaterial {...GOLD_M} />
      </mesh>
      {/* Handle loop 2 */}
      <mesh position={[-0.1, -0.22, 0.015]} castShadow>
        <torusGeometry args={[0.09, 0.02, 10, 28]} />
        <meshStandardMaterial {...GOLD_M} />
      </mesh>
    </group>
  )
}

/* ── Nail Polish Bottle ─────────────────────── */
function NailPolish({ position, scale = 1, color = '#c9a84c', mouse }) {
  const group = useRef()
  const t = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    t.current += delta * 0.45
    if (!group.current) return
    group.current.rotation.y += delta * 0.4
    group.current.rotation.z = Math.sin(t.current * 0.7) * 0.1
    group.current.position.y = position[1] + Math.sin(t.current) * 0.1 + mouse.current[1] * 0.07
    group.current.position.x = position[0] + mouse.current[0] * 0.1
    group.current.position.z = position[2]
  })

  return (
    <group ref={group} scale={scale}>
      {/* Bottle body — square-ish */}
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.5, 0.22]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.05} transparent opacity={0.85} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.08, 0.16, 12]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}

/* ── Floating Crystal / Gem ─────────────────── */
function Crystal({ position, scale = 1, mouse }) {
  const mesh = useRef()
  const t = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    t.current += delta * 0.6
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.4
    mesh.current.rotation.y += delta * 0.6
    mesh.current.position.y = position[1] + Math.sin(t.current) * 0.18 + mouse.current[1] * 0.06
    mesh.current.position.x = position[0] + mouse.current[0] * 0.08
    mesh.current.position.z = position[2]
  })

  return (
    <mesh ref={mesh} scale={scale} castShadow>
      <octahedronGeometry args={[0.22, 0]} />
      <MeshDistortMaterial
        color="#e2c97e"
        metalness={1}
        roughness={0}
        distort={0.15}
        speed={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

/* ── Luxury Sphere (soap / product) ─────────── */
function LuxurySphere({ position, scale = 1, color, mouse }) {
  const mesh = useRef()
  const t = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    t.current += delta * 0.35
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.2
    mesh.current.position.y = position[1] + Math.sin(t.current * 0.9) * 0.12 + mouse.current[1] * 0.05
    mesh.current.position.x = position[0] + mouse.current[0] * 0.06
    mesh.current.position.z = position[2]
  })

  return (
    <mesh ref={mesh} scale={scale} castShadow>
      <sphereGeometry args={[0.25, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        metalness={0.7}
        roughness={0.1}
        distort={0.2}
        speed={1.5}
        transparent
        opacity={0.82}
      />
    </mesh>
  )
}

/* ── Torus / Ring (jewelry accent) ─────────── */
function GoldRing({ position, scale = 1, mouse }) {
  const mesh = useRef()
  const t = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    t.current += delta * 0.5
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.3
    mesh.current.rotation.z += delta * 0.15
    mesh.current.position.y = position[1] + Math.sin(t.current) * 0.1 + mouse.current[1] * 0.05
    mesh.current.position.x = position[0] + mouse.current[0] * 0.07
  })

  return (
    <mesh ref={mesh} scale={scale} castShadow>
      <torusGeometry args={[0.2, 0.06, 16, 48]} />
      <meshStandardMaterial color="#c9a84c" metalness={1} roughness={0.04} />
    </mesh>
  )
}

/* ── Scene root ─────────────────────────────── */
function Scene({ mouse }) {
  return (
    <>
      {/* Lighting — warm studio look */}
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 4, 3]}   intensity={2.5} color="#e2c97e" />
      <pointLight position={[-4, -2, 2]} intensity={1.2} color="#c9a84c" />
      <pointLight position={[0, 6, -4]}  intensity={0.8} color="#ffffff" />
      <spotLight
        position={[0, 8, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#f5f0e8"
        castShadow={false}
      />

      {/* Environment for reflections — lightweight preset */}
      <Environment preset="city" />

      {/* Gold sparkle particles — drei built-in, very cheap */}
      <Sparkles
        count={60}
        scale={8}
        size={1.4}
        speed={0.3}
        opacity={0.5}
        color="#c9a84c"
      />

      {/* ── Objects — left cluster ──────────────── */}
      <Float speed={1.2} rotationIntensity={0} floatIntensity={0}>
        <CosmeticBottle position={[-3.2,  0.4, -1.5]} scale={1.1} speed={0.35} mouse={mouse} />
      </Float>

      <Float speed={0.9} rotationIntensity={0} floatIntensity={0}>
        <NailPolish    position={[-2.0, -0.8, -2.0]} scale={0.95} color="#c9a84c" mouse={mouse} />
      </Float>

      <Float speed={1.4} rotationIntensity={0} floatIntensity={0}>
        <Crystal       position={[-1.4,  1.1, -2.5]} scale={0.8}  mouse={mouse} />
      </Float>

      {/* ── Objects — right cluster ─────────────── */}
      <Float speed={1.0} rotationIntensity={0} floatIntensity={0}>
        <Scissors      position={[ 2.8,  0.6, -1.8]} scale={1.3}  mouse={mouse} />
      </Float>

      <Float speed={1.3} rotationIntensity={0} floatIntensity={0}>
        <NailPolish    position={[ 2.0, -0.6, -2.2]} scale={0.85} color="#a07830" mouse={mouse} />
      </Float>

      <Float speed={0.8} rotationIntensity={0} floatIntensity={0}>
        <LuxurySphere  position={[ 3.6, -0.2, -2.5]} scale={0.9}  color="#c9a84c" mouse={mouse} />
      </Float>

      {/* ── Objects — top / center accents ─────── */}
      <Float speed={1.1} rotationIntensity={0} floatIntensity={0}>
        <GoldRing      position={[ 0.2,  2.0, -3.0]} scale={1.0}  mouse={mouse} />
      </Float>

      <Float speed={1.5} rotationIntensity={0} floatIntensity={0}>
        <Crystal       position={[-0.5, -1.6, -2.0]} scale={0.65} mouse={mouse} />
      </Float>

      <Float speed={0.7} rotationIntensity={0} floatIntensity={0}>
        <CosmeticBottle position={[ 0.8, -1.8, -2.8]} scale={0.8} speed={0.5} mouse={mouse} />
      </Float>
    </>
  )
}

/* ── Exported canvas wrapper ────────────────── */
export default function HeroScene({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 52 }}
      dpr={[1, 1.5]}           // cap pixel ratio for performance
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <Scene mouse={mouse} />
    </Canvas>
  )
}
