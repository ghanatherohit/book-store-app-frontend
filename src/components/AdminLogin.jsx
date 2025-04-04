import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios'
import getBaseUrl from '../utils/baseUrl';
import Swal from 'sweetalert2';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';


const loginSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
        .refine((val) => !/\s/.test(val), { message: "Username must not contain spaces" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .refine((val) => !/\s/.test(val), { message: "Password must not contain spaces" }),
});


const AdminLogin = () => {
    window.scrollTo(0, 0)

    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "all",
    });

    const onSubmit = async (data) => {
        try {
            // Sanitize the input data to prevent XSS attacks
            data.username = DOMPurify.sanitize(data.username)
            data.password = DOMPurify.sanitize(data.password)
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
                //remove toast when the user clicks on anywhere on the screen
                didOpen: (toast) => {
                    window.addEventListener("click", () => {
                        Toast.close(toast)
                    })
                },
                onOpen: (toast) => {
                    window.addEventListener("click", () => {
                        Toast.close(toast)
                    })
                },
            });
            Toast.fire({
                icon: "success",
                title: "Admin login successful",
            });
            reset()
            navigate('/dashboard')
        } catch (error) {
            setMessage("Invalid username or password", error.message)
            console.error(error)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                //remove toast when the user clicks on anywhere on the screen
                didOpen: (toast) => {
                    window.addEventListener("click", () => {
                        Toast.close(toast)
                    })
                },
                onOpen: (toast) => {
                    window.addEventListener("click", () => {
                        Toast.close(toast)
                    })
                },
            });
            Toast.fire({
                icon: "error",
                title: "Invalid username or password"
            });
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
                        {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
                    </div>

                    <div className="relative">
                        <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor="password">
                            Password
                        </label>
                        <input
                            autoComplete="current-password"
                            {...register("password", { required: true })}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder='Enter your password'
                            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary pr-10 transition-all duration-200 focus:outline-none'
                        />
                        <button
                            type="button"
                            className='absolute right-3 top-[45px] text-gray-600 cursor-pointer transition-all duration-200 hover:scale-110'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
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