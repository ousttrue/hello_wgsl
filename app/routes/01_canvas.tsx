import React from 'react';
import SizeObserver from './SizeObserver.ts';

class Renderer {
  readonly observer: SizeObserver;
  private width;
  private height;

  readonly gl: WebGL2RenderingContext;
  readonly requestId: number = 0;

  constructor(
    readonly canvas: HTMLCanvasElement,
    container: HTMLElement,
  ) {
    this.gl = canvas.getContext('webgl2')!;
    console.assert(this.gl instanceof WebGL2RenderingContext, 'no WebGL2RenderingContext');
    this.requestId = requestAnimationFrame(() => this.render());
    this.observer = new SizeObserver(container, (w, h) => {
      this.width = w;
      this.height = h;
    });
    this.width = canvas.width;
    this.height = canvas.height;
  }
  close() {
    cancelAnimationFrame(this.requestId);
  }
  private render() {
    if (this.width != this.canvas.width || this.height != this.canvas.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      console.log(this.canvas.width, this.canvas.height);
    }
    else {
      this.gl.clearColor(0.5, 0.0, 0.0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    requestAnimationFrame(() => this.render());
  }
}


// https://github.com/mikbry/react-webgl-app
export default function Canvas() {
  const refContainer = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const webGL = new Renderer(ref.current!, refContainer.current!);
    return () => {
      webGL.close();
    };
  });
  // https://zenn.dev/rerrah/articles/2195b607c7af98
  return (<div
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
  </div >);
}
