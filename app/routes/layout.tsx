import { Outlet } from 'react-router';
import "./layout.css"
import { Icon } from '@iconify/react';

export default function Layout() {
  return (
    <>
      <header>
        <a href="/"><h1>hello wgsl</h1></a>

        <span className="padding" />

        <a href="https://github.com/ousttrue/hello_wgsl" target="_blank">
          <Icon icon="mdi:github" height="24" />
        </a>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        フッター
      </footer>
    </>
  )
}
