import React from 'react' // eslint-disable-line no-unused-vars
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ isAuth }) => {
  return (
    isAuth ? <Outlet /> : <Navigate to={'/login'} /> //isAuth가 true이면 outlet / false면 login 페이지로
  )
}

export default ProtectedRoutes