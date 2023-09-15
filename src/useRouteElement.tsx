import * as React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { AppContext } from './contexts/app.context'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'

function ProtecedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}
function RejectedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtecedRoute />,
      children: [
        {
          path: '/',
          index: true,
          element: <Dashboard />
        }
      ]
    }
  ])

  return routeElements
}
export default useRouteElements
