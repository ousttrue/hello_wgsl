import React from 'react';

class WebGL {
  readonly gl: WebGL2RenderingContext;
  requestId: number = 0;
  constructor(
    readonly canvas: HTMLCanvasElement,
    public width: number,
    public height: number
  ) {
    this.gl = this.canvas.getContext('webgl2')!;
    console.assert(this.gl instanceof WebGL2RenderingContext, 'no WebGL2RenderingContext');
  }
  requestRender() {
    this.requestId = requestAnimationFrame(() => this.render());
  }
  private render() {
    this.gl.clearColor(0.5, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.requestRender();
  }
  close() {
    cancelAnimationFrame(this.requestId);
  }
}

// https://github.com/mikbry/react-webgl-app
export default function Triangle(props: { width: number, height: number }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current!;
    const webGL = new WebGL(canvas, props.width, props.height);
    webGL.requestRender();
    return () => {
      webGL.close();
    };
  });

  return (<canvas
    ref={ref}
    width={500}
    height={500}
    style={{
      width: "100%",
      height: "100%",
    }} />);
}
