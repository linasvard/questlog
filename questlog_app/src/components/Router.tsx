import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [{ index: true, Component: Home }],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
