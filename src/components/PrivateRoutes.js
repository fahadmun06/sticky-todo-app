import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRoutes({ Component }) {
    const { isAuth } = useAuthContext()
    const location = useLocation()

    if (!isAuth)
        return <Navigate to='/auth/login' state={{ from: location.pathname }} replace />
    return (
        <Component />
    )

}
