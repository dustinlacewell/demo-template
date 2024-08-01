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
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let frameCount = 0

        const handleResize = () => {
            const scale = window.devicePixelRatio
            const width = canvas.parentElement?.clientWidth ?? 0
            const height = canvas.parentElement?.clientHeight ?? 0

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
        <div className="canvas-container overflow-hidden rounded-[5px] w-full h-full flex flex-col items-stretch shadow-lg shadow-neutral-400 dark:shadow-none dark:border-[1px] dark:border-neutral-300">
            <canvas
                ref={canvasRef}
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                }}
            />
        </div>
    )
}