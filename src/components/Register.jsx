import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from 'sweetalert2'

const registerSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(5, { message: 'Email is too short' })
        .max(50, { message: 'Email is too long' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: 'Password must be at most 20 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .refine((val) => !/\s/.test(val), { message: 'Password must not contain spaces' }),
})

const Register = () => {
    const { currentUser, registerUser, signInWithGoogle } = useAuth()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'all',
    })

    // Redirect if already logged in
    useEffect(() => {
        if (currentUser) {
            // Show a success message if the user is already logged in
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    window.addEventListener('click', () => {
                        Toast.close(toast)
                    })
                },
                onOpen: (toast) => {
                    window.addEventListener('click', () => {
                        Toast.close(toast)
                    })
                },
            })
            Toast.fire({
                icon: 'success',
                title: 'You are already logged in',
            })
            navigate('/')
        }
    }, [currentUser, navigate])

    const onSubmit = async (data) => {
        setLoading(true)
        setMessage('')
        try {
            // Sanitize the input data
            const email = data.email.trim().toLowerCase()
            const password = data.password.trim()
            await registerUser(email, password)
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
                title: "Login Successful"
            });

            reset()
            navigate('/')
        } catch (error) {
            setMessage('Failed to create an account. Please try again.')
            if (error.code === 'auth/email-already-in-use') {
                setMessage('Email already in use. Please use a different email.')
            } else if (error.code === 'auth/weak-password') {
                setMessage('Password is too weak. Please use a stronger password.')
            } else if (error.code === 'auth/invalid-email') {
                setMessage('Invalid email address. Please enter a valid email.')
            } else if (error.code === 'auth/operation-not-allowed') {
                setMessage('Email/Password accounts are not enabled. Please contact support.')
            } else if (error.code === 'auth/too-many-requests') {
                setMessage('Too many requests. Please try again later.')
            } else {
                setMessage('An unexpected error occurred. Please try again.')
            }
            // Log the error for debugging
            console.error('Register error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            alert('Login successful!')
            navigate('/')
        } catch (error) {
            setMessage('Failed to login with Google')
            console.error('Google Sign In error:', error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register Now</h2>
                {message && <p className="text-red-500 text-xs italic mb-4">{message}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            autoComplete="email"
                            {...register('email', { required: true })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            autoComplete="current-password"
                            {...register('password', { required: true })}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            className='absolute right-3 top-[42px] text-gray-600 cursor-pointer transition-all duration-200 hover:scale-110'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>
                    {/* Submit Button */}
                    <div className="w-full flex justify-center">
                        <button
                            name="submit"
                            id="submit"
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                {/* Login Link */}
                <p className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                        Login
                    </Link>
                </p>
                {/* Divider */}
                <div className="flex items-center justify-between my-6">
                    <div className="w-full h-px bg-gray-300" />
                    <span className="px-2 text-gray-500 text-sm whitespace-nowrap">Or continue with</span>
                    <div className="w-full h-px bg-gray-300" />
                </div>
                {/* Google Login */}
                <div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
                    >
                        <FcGoogle className="mr-2" size={28} />
                        <span className="font-semibold text-gray-700">Sign in with Google</span>
                    </button>
                </div>
                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs">© 2025 Book Store Company, Inc.</p>
                    <Link className="block text-gray-500 text-xs hover:text-indigo-700">
                        Terms and Conditions
                    </Link>
                    <Link className="block text-gray-500 text-xs hover:text-indigo-700">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register