import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface ThreeCanvasProps {
  setup?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void
  draw?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, delta: number, frameCount: number) => void
}

interface Dimensions {
  width: number
  height: number
}

export const Three: React.FC<ThreeCanvasProps> = ({
  setup,
  draw,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef(new THREE.Clock())
  const [_, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    let animationFrameId: number
    let frameCount = 0

    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      setDimensions({ width, height })

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const render = () => {
      frameCount++
      const delta = clockRef.current.getDelta()
      if (draw) {
        draw(scene, camera, renderer, delta, frameCount)
      }
      renderer.render(scene, camera)
      animationFrameId = window.requestAnimationFrame(render)
    }

    container.appendChild(renderer.domElement)
    handleResize()
    window.addEventListener('resize', handleResize)

    if (setup) {
      setup(scene, camera, renderer)
    }

    camera.position.z = 5
    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(animationFrameId)
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [setup, draw])

  return (
    <div
      ref={containerRef}
      className="canvas-container overflow-hidden w-full h-full flex flex-col items-stretch justify-stretch"
    />
  )
}