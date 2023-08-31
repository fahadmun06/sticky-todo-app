import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import PrivateRoutes from '../components/PrivateRoutes'
import { useAuthContext } from '../contexts/AuthContext'

export default function Index() {
    const { isAuth } = useAuthContext()
    return (
        <>
            <Routes>
                <Route path='/*' element={<PrivateRoutes Component={Frontend} />} />
                <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to='/' />} />
                <Route path='*' element={<h1 className='d-flex justify-content-center align-items-center'>404 ERROR</h1>} />
            </Routes>
        </>
    )
}
