import React from 'react' // eslint-disable-line no-unused-vars
import { Navigate, Outlet } from 'react-router-dom'

const NotAuthRoutes = ({ isAuth }) => {
  return (
    isAuth ? <Navigate to={'/'} /> : <Outlet />
  )
}

export default NotAuthRoutes