import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import { FaEyeSlash } from "react-icons/fa"
import { useAuth } from '../context/AuthContext'

const Register = () => {


    window.scrollTo(0, 0)
    const [message, setMessage] = useState('')
    const { registerUser } = useAuth()
    const navigate = useNavigate()

    if (registerUser) navigate('/')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    //register User
    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password)
            alert('Account created successfully')
        }
        catch (error) {
            setMessage('Enter a valid email and password')
            alert('Failed to create an account')
            console.error('Failed to create an account', error)
        }
    }

    const handleGoogleSignIn = async () => {
        console.log('Google Sign In')
        try {
            await signInWithGoogle()
            alert("Login successful!")
            navigate("/")
        } catch (error) {
            setMessage("Failed to login")
            alert("Failed to login")
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register Now</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            autoComplete="current-email"
                            {...register("email", { required: true })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            autoComplete="current-password"
                            {...register("password", { required: true })}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            className=" absolute right-3 top-[38px] text-gray-600 focus:outline-none"
                            onClick={() => {
                                const password = document.getElementById('password')
                                password.type = password.type === 'password' ? 'text' : 'password'
                            }}
                        >
                            <FaEyeSlash />
                        </button>
                    </div>
                    {/* Error */}
                    {message && (
                        <p className="text-red-500 text-xs italic">{message}</p>
                    )}
                    {/* Register Button */}
                    <div className="w-full flex justify-center">
                        <button
                            name="submit"
                            id="submit"
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Register
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
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs">© 2025 Book Store Company, Inc.</p>
                    <a href="#" className="block text-gray-500 text-xs hover:text-indigo-700">
                        Terms and Conditions
                    </a>
                    <a href="#" className="block text-gray-500 text-xs hover:text-indigo-700">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Register