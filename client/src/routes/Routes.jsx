import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import DashboardLayout from '../layouts/DashboardLayout'
import MyProfile from '../pages/Dashboard/User/MyProfile'
import AddProduct from '../pages/Dashboard/User/AddProduct'
import MyProducts from '../pages/Dashboard/User/MyProducts'
import ProductQueue from '../pages/Dashboard/Moderator/ProductQueue'
import ReportedContents from '../pages/Dashboard/Moderator/ReportedContents'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AllProducts from '../pages/AllProducts/AllProducts'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Welcome from '../pages/Dashboard/Welcome'
import PrivateRoute from './PrivateRoute'
import ModeratorRoute from './ModeratorRoute'
import AdminRoute from './AdminRoute'
import Statistics from '../pages/Dashboard/Admin/Statistics'

export const router = createBrowserRouter([
  { 
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-products',
        element: <AllProducts />,
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-product',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-products',
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'product-queue',
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <ProductQueue />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'reported-contents',
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <ReportedContents />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'statistics',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Statistics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
])
