import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth()
    if (loading) {
        return <div className='flex flex-row items-center justify-center h-[90vh] w-full'>
            <p className='text-3xl font-semibold text-center'>
                Loding
            </p>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#2563EB"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                className="inline-block m-7"
            />
        </div>
    }
    return ((currentUser)?children:<Navigate to="/login" replace />)
}

export default PrivateRoute