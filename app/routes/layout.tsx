import { Outlet } from 'react-router';

export const Layout: React.FC = () => {
  return (
    <>
      <header>
        ヘッダー
      </header>
      <Outlet />
      <footer>
        フッター
      </footer>
    </>
  )
}
