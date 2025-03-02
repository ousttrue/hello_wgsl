import React from 'react';

// https://zenn.dev/rerrah/articles/2195b607c7af98
class SizeObserver {
  readonly observer: ResizeObserver;
  constructor(
    container: HTMLElement,
    onResize: (width: number, height: number) => void
  ) {
    // https://developer.mozilla.org/ja/docs/Web/API/ResizeObserverEntry/devicePixelContentBoxSize
    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const size = entry.devicePixelContentBoxSize[0];
          onResize(size.inlineSize, size.blockSize);
        }
      }
    });
    this.observer.observe(container, { box: "device-pixel-content-box" });
  }
}

class WebGL2 {
  readonly gl: WebGL2RenderingContext;
  readonly requestId: number = 0;
  readonly observer: SizeObserver;
  private width;
  private height;

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
  close() {
    cancelAnimationFrame(this.requestId);
  }
}

// https://github.com/mikbry/react-webgl-app
export default function Triangle() {
  const refContainer = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const webGL = new WebGL2(ref.current!, refContainer.current!);
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
