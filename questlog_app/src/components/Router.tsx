import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import Layout from './pages/Layout';
import GameDetailPage from './pages/GameDetailPage';
import EditGamePage from './pages/EditGamePage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: '/games/:gameId', Component: GameDetailPage },
      { path: '/games/:gameId/edit', Component: EditGamePage },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
