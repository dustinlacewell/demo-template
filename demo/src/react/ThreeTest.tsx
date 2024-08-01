import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import { Three } from '@ldlework/demo-lib-react'
import * as THREE from 'three'
import CameraControls from 'camera-controls'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  radius: number
  life: number
  mesh: THREE.Mesh
}

export const ThreeTest: React.FC = () => {
  const particlesRef = useRef<Particle[]>([])
  const particleSystemRef = useRef<THREE.Group | null>(null)
  const controlsRef = useRef<CameraControls | null>(null)

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffa500 }), [])

  const createParticle = useCallback((radius: number): Particle => {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    
    const speed = 0.01
    const particleRadius = Math.random() * 0.035 + 0.001
    const geometry = new THREE.SphereGeometry(particleRadius)
    const mesh = new THREE.Mesh(geometry, material)
    
    const position = new THREE.Vector3(x, y, z)
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * speed,
      (Math.random() - 0.5) * speed,
      (Math.random() - 0.5) * speed
    )
    
    return {
      position: position,
      velocity: velocity,
      radius: particleRadius,
      life: 1,
      mesh: mesh
    }
  }, [material])

  const setup = useCallback((scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    particleSystemRef.current = new THREE.Group()
    scene.add(particleSystemRef.current)

    // Add OrbitControls
    CameraControls.install({ THREE: THREE })
    const controls = new CameraControls(camera, renderer.domElement)
    controls.dampingFactor = 0.0001
    controls.draggingDampingFactor = 0.0001
    controls.draggingSmoothTime = 0.2
    controls.distance = 3
    controls.polarAngle = Math.PI / 2
    controlsRef.current = controls

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
  }, [])

  const draw = useCallback((scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, delta: number, frameCount: number) => {
    const spawnRadius = 1
    const newParticlesCount = 5

    // Update existing particles
    particlesRef.current = particlesRef.current
      .map((p) => {
        p.position.add(p.velocity)
        p.life -= 0.01
        p.mesh.position.copy(p.position)
        p.mesh.scale.setScalar(p.life)
        return p
      })
      .filter((p) => {
        if (p.life <= 0) {
          particleSystemRef.current?.remove(p.mesh)
          p.mesh.geometry.dispose()
          return false
        }
        return true
      })

    // Create new particles
    for (let i = 0; i < newParticlesCount; i++) {
      const newParticle = createParticle(spawnRadius)
      newParticle.mesh.position.copy(newParticle.position)  // Set initial position
      particlesRef.current.push(newParticle)
      particleSystemRef.current?.add(newParticle.mesh)
    }

    // Update OrbitControls
    if (controlsRef.current) {
      controlsRef.current.update(delta)
    }
  }, [createParticle])

  return <Three setup={setup} draw={draw} />
}