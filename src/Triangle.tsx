import { WebGPUDeviceContextProvider, useWebGPUDevice } from './useWebGPUDevice';
import { run } from './wgpu_main';
import React from 'react'

const MyWebGPUApp = () => {
  const device: GPUDevice = useWebGPUDevice();
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      throw new Error('no canvas')
    }
    const context = canvas.getContext('webgpu')
    if (!context) {
      throw new Error('no context')
    }

    const id = run(device, canvas, context);
    return () => {
      cancelAnimationFrame(id);
    };
  });

  return <canvas ref={ref} width={500} height={500} />;
};


function Triangle() {
  return (<>
    <WebGPUDeviceContextProvider
      loadingMessage={(<p>Loading...</p>)}
      notSupportedMessage={(<p>WebGPU is not supported on this browser.</p>)}>
      <MyWebGPUApp />
    </WebGPUDeviceContextProvider>
  </>)
}

export default Triangle
