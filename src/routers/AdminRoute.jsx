import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token")
    return !token ? <Navigate to="/adminLogin" /> : (children ? children : <Outlet />) 
}

export default AdminRoute