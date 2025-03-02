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

export default SizeObserver;
