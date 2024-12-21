import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AgeVerification from '../pages/AgeVerification';
import Home from '../pages/Home';
import CigaretteList from '../pages/CigaretteList';
import CigaretteDetail from '../pages/CigaretteDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import UserAccount from '../pages/UserAccount';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminCigarettes from '../pages/admin/Cigarettes';
import AdminOrders from '../pages/admin/Orders';
import AdminUsers from '../pages/admin/Users';
import { RequireAuth, RequireAdmin, RequireAge } from '../components/Auth';
import RequireReferrer from '../components/Auth/RequireReferrer';

export const router = createBrowserRouter([
  {
    path: '/age-verification',
    element: <AgeVerification />,
  },
  {
    path: '/',
    element: (
      <RequireReferrer>
        <RequireAge>
          <MainLayout />
        </RequireAge>
      </RequireReferrer>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/cigarettes', element: <CigaretteList /> },
      { path: '/cigarette/:id', element: <CigaretteDetail /> },
      { path: '/cart', element: <RequireAuth><Cart /></RequireAuth> },
      { path: '/checkout', element: <RequireAuth><Checkout /></RequireAuth> },
      { path: '/account', element: <RequireAuth><UserAccount /></RequireAuth> },
    ],
  },
  {
    path: '/admin',
    element: <RequireAdmin><AdminLayout /></RequireAdmin>,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'cigarettes', element: <AdminCigarettes /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'users', element: <AdminUsers /> },
    ],
  },
  {
    path: '/access-denied',
    element: <AccessDenied />,
  },
]); 