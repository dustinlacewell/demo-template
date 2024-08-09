import React, { useRef, useEffect, useState } from 'react'

interface CanvasProps {
    setup?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
    draw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frameCount: number) => void
}

interface Dimensions {
    width: number
    height: number
}

export const Canvas: React.FC<CanvasProps> = ({
    setup,
    draw,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [_, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current

        if (!canvas) return
        if (!container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let frameCount = 0

        const handleResize = () => {
            const scale = window.devicePixelRatio
            const width = container.clientWidth
            const height = container.clientHeight

            setDimensions({ width, height })

            canvas.width = width * scale
            canvas.height = height * scale
            ctx.scale(scale, scale)
        }

        const render = () => {
            frameCount++
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            if (draw) {
                draw(ctx, canvas, frameCount)
            }

            animationFrameId = window.requestAnimationFrame(render)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        if (setup) {
            setup(ctx, canvas)
        }

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [setup, draw])

    return (
        <div ref={containerRef} className="canvas-container w-full h-full flex flex-col items-stretch justify-stretch overflow-hidden">
            <canvas
                ref={canvasRef} />
        </div>
    )
}