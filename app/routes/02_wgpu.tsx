import React from 'react';
import SizeObserver from './SizeObserver.ts';

// https://zenn.dev/blueteam/articles/576b7f1f5fd034
import vertexShader from './shaders/vertex.wgsl?raw';
import fragmentShader from './shaders/fragment.wgsl?raw';

export async function clientLoader() {
  const adapter = await navigator.gpu.requestAdapter()
  console.assert(adapter instanceof GPUAdapter, 'no GPUAdapter');
  const device = await adapter!.requestDevice()
  return { adapter, device };
}

class Renderer {
  readonly observer: SizeObserver;
  private width;
  private height;

  readonly requestId: number;
  readonly pipeline: GPURenderPipeline;
  readonly context: GPUCanvasContext;

  constructor(
    readonly device: GPUDevice,
    readonly canvas: HTMLCanvasElement,
    container: HTMLElement) {
    this.observer = new SizeObserver(container, (w, h) => {
      this.width = w;
      this.height = h;
    });
    this.width = canvas.width;
    this.height = canvas.height;

    const format = navigator.gpu.getPreferredCanvasFormat()

    this.context = canvas.getContext('webgpu')!;
    console.assert(this.context instanceof GPUCanvasContext);
    this.context.configure({
      device,
      format,
      alphaMode: 'premultiplied',
    })

    this.pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: device.createShaderModule({
          code: vertexShader,
        }),
      },
      fragment: {
        module: device.createShaderModule({
          code: fragmentShader,
        }),
        targets: [
          {
            format,
          },
        ],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });
    this.requestId = requestAnimationFrame(() => this.frame());
  }
  close() {
    cancelAnimationFrame(this.requestId);
  }

  frame() {
    if (this.width != this.canvas.width || this.height != this.canvas.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      console.log(this.canvas.width, this.canvas.height);
    }
    else {
      const textureView = this.context.getCurrentTexture().createView()

      const commandEncoder = this.device.createCommandEncoder()

      const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
          {
            view: textureView,
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
      }
      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)

      passEncoder.setPipeline(this.pipeline)
      passEncoder.draw(3)
      passEncoder.end()
      this.device.queue.submit([commandEncoder.finish()])
    }
    requestAnimationFrame(() => this.frame());
  }
}

export default function WebGpu({ loaderData }) {
  const { adapter, device } = loaderData;
  const refContainer = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const webGL = new Renderer(device, ref.current!, refContainer.current!);
    return () => {
      webGL.close();
    };
  });
  // https://zenn.dev/rerrah/articles/2195b607c7af98
  return (
    <div
      ref={refContainer}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "gray",
        overflow: "hidden",
        position: "relative",
      }}>
      <canvas ref={ref} style={{
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      />
    </div >
  );
}
