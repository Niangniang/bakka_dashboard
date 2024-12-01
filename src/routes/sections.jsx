import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { AppView } from 'src/sections/overview/view';
import { Signup } from 'src/sections/signup';
import { UserView } from 'src/sections/user/view';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ParameterPage = lazy(() => import('src/pages/parameter'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    // Rediriger de la racine vers la page de connexion
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'parameter', element: <ParameterPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/dashboard',
      element: (
        <DashboardLayout>
          <AppView />
        </DashboardLayout>
      ),
    },
    {
      path: '/user',
      element: (
        <DashboardLayout>
          <UserView />
        </DashboardLayout>
      ),
    },
  ]);

  return routes;
}
