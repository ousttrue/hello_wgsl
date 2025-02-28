---
title: triangle
---

# bun + vite + typescript で WGPU を練習

## project 初期化

https://ja.vite.dev/guide/

```sh
$ mkdir hello_wgsl
$ cd hello_wgsl
$ bun create vite .
# react + typescript
$ bun install
$ bun run dev
```

## 三角形描画

- 参考 [WebGPU と TypeScript で始める、次世代のグラフィックス開発入門](https://zenn.dev/blueteam/articles/576b7f1f5fd034)

## React 化

```typescript title="ts"
export function run(
  device: GPUDevice,
  canvas: HTMLCanvasElement,
  context: GPUCanvasContext,
): number;
```

が描画関数で引数を供給する。
device は取得に async があって、canvas は ref が必要になる。
React では工夫が必要。

- [WebGPU未対応の場合にカスタマイズ可能なエラーメッセージをReact Contextでブラウザ画面上に表示する #React - Qiita](https://qiita.com/kubo_hiroya/items/7eb9386f06c6871f361a)
- https://github.com/mikbry/react-webgl-app

## build

typescript の設定。

- [rollupでtypescriptを使う](https://zenn.dev/s_takashi/scraps/ee10b6d8a6a937)

# markdown

メモを markdown で書いて、近くに canvas を配置するスタイルにしてみる。

- https://www.npmjs.com/package/marked-react

# gh-pages

- https://github.com/actions/upload-pages-artifact
- https://ja.vite.dev/config/shared-options#base
