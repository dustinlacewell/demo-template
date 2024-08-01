import { component$, useVisibleTask$, useSignal, useStore, $ } from '@builder.io/qwik';

interface CanvasProps {
  setup?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  draw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frameCount: number) => void;
}

interface Dimensions {
  width: number;
  height: number;
}

export const Canvas = component$<CanvasProps>(({ }) => {
//   const canvasRef = useSignal<HTMLCanvasElement>();
//   const dimensions = useStore<Dimensions>({ width: 0, height: 0 });
//   const frameCount = useSignal(0);

//   useVisibleTask$(({ cleanup }) => {
//     const canvas = canvasRef.value;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let animationFrameId: number;

//     const handleResize = $(() => {
//       const scale = window.devicePixelRatio;
//       const width = canvas.parentElement?.clientWidth ?? 0;
//       const height = canvas.parentElement?.clientHeight ?? 0;
//       dimensions.width = width;
//       dimensions.height = height;
//       canvas.width = width * scale;
//       canvas.height = height * scale;
//       ctx.scale(scale, scale);
//     });

//     const render = $(() => {
//       frameCount.value++;
//       ctx.fillStyle = 'black';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       if (draw) {
//         draw(ctx, canvas, frameCount.value);
//       }
//       animationFrameId = window.requestAnimationFrame(() => render());
//     });

//     handleResize();
//     window.addEventListener('resize', () => handleResize());

//     if (setup) {
//       setup(ctx, canvas);
//     }

//     render();

//     cleanup(() => {
//       window.removeEventListener('resize', () => handleResize());
//       window.cancelAnimationFrame(animationFrameId);
//     });
//   });

  return (
    // <div class="canvas-container overflow-hidden rounded-[5px] w-full h-full flex flex-col items-stretch shadow-lg shadow-neutral-400 dark:shadow-none dark:border-[1px] dark:border-neutral-300">
    //   <canvas
    //     ref={canvasRef}
    //     style={{
    //       width: `${dimensions.width}px`,
    //       height: `${dimensions.height}px`,
    //     }}
    //   />
    // </div>
    <div>umm</div>
  );
});