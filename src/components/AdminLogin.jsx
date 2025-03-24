import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios'
import getBaseUrl from '../utils/baseUrl';
import Swal from 'sweetalert2';

const AdminLogin = () => {
    window.scrollTo(0, 0)

    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                // This is to make sure that the backend knows that the data is in JSON format.
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const auth = response.data

            if (auth.token) {
                localStorage.setItem('token', auth.token)
                setTimeout(() => {
                    localStorage.removeItem('token')
                }, 3600000)
            }
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Admin Login Successful"
            });

            navigate('/dashboard')
        } catch (error) {
            setMessage("Invalid username or password", error.message)
            console.error(error)
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-50 py-8'>
            <div className='w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-100'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Admin Dashboard Login</h2>

                {message && (
                    <div className='mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm'>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor="email">
                            User Name
                        </label>
                        <input
                            autoComplete="name"
                            {...register("username", { required: true })}
                            type="text"
                            id="username"
                            placeholder='Enter your username'
                            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary transition-all duration-200 focus:outline-none'
                        />
                    </div>

                    <div className="relative">
                        <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor="password">
                            Password
                        </label>
                        <input
                            autoComplete="current-password"
                            {...register("password", { required: true })}
                            type="password"
                            id="password"
                            placeholder='Enter your password'
                            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary pr-10 transition-all duration-200 focus:outline-none'
                        />
                        <p
                            type=""
                            className='absolute right-3 top-[45px] text-gray-600 cursor-pointer transition-all duration-200 hover:scale-110'
                            onClick={() => {
                                const password = document.getElementById('password')
                                if (password.type === 'password') {
                                    password.type = 'text'
                                } else {
                                    password.type = 'password'
                                }
                            }}
                        >
                            <FaEyeSlash />
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className='w-full bg-primary text-gray-900 font-semibold py-2.5 px-4 rounded-lg hover:bg-yellow-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                    >
                        Login
                    </button>
                </form>

                <div className='mt-8 pt-5'>
                    <p className='text-gray-500 text-xs text-center'>© 2025 Book Store Company, Inc.</p>
                    <div className='flex justify-center gap-4 mt-2'>
                        <a className='text-xs text-gray-500 hover:text-gray-700'>Terms of Service</a>
                        <a className='text-xs text-gray-500 hover:text-gray-700'>Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin