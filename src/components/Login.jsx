import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email is too short" })
        .max(50, { message: "Email is too long" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .refine((val) => !/\s/.test(val), { message: "Password must not contain spaces" }),
});

  
  
const Login = () => {
    window.scrollTo(0, 0)

    const [message, setMessage] = useState('')
    const { loginUser, signInWithGoogle } = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    // Form validation using react-hook-form and zod from preventing xss attacks and sql injection
    // zod is a schema validation library that helps to validate the data before sending it to the server
    const { register, handleSubmit, formState: { errors },reset} = useForm({
        resolver: zodResolver(loginSchema),
        mode: "all",
    });

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email.trim().toLowerCase(), data.password)
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
            setTimeout(() => {
                setMessage("")
            }, 3000)
            // Redirect to home page after successful login
            reset()
            navigate("/")
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setMessage("User not found")
            }
            else if (error.code === "auth/wrong-password") {
                setMessage("Wrong password")
            }
            else if (error.code === "auth/invalid-email") {
                setMessage("Invalid email")
            }
            else if (error.code === "auth/too-many-requests") {
                setMessage("Too many requests, please try again later")
            }
            else {
                setMessage("Invalid credentials")
            }
            setTimeout(() => {
                setMessage("")
            }, 3000)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Invalid Credentials"
            });
            console.error(error.code)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "success",
                title: "Login Successful"
            });
            setTimeout(() => {
                setMessage("")
            }, 3000)
            navigate("/")
        } catch (error) {
            setMessage("Failed to login")
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Failed to login with Google"
            });
            setTimeout(() => {
                setMessage("")
            }, 3000)
            console.error(error)
        }
    }

    return (
        <div className='min-h-[calc(100vh-120px)] flex justify-center items-center bg-gray-50 py-8'>
            <div className='w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-100'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Welcome Back</h2>
                {message && (
                    <div className='mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm'>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor="email">
                            Email Address
                        </label>
                        <input
                            autoComplete="email"
                            {...register("email", { required: true })}
                            type="email"
                            id="email"
                            placeholder='Enter your email'
                            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary transition-all duration-200 focus:outline-none'
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
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
                        <Link className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className='w-full bg-primary text-gray-900 font-semibold py-2.5 px-4 rounded-lg hover:bg-yellow-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                    >
                        Sign In
                    </button>
                </form>

                <div className='flex items-center my-6'>
                    <div className='flex-grow h-px bg-gray-300'></div>
                    <p className='mx-4 text-sm text-gray-500'>or</p>
                    <div className='flex-grow h-px bg-gray-300'></div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className='flex w-full items-center justify-center gap-3 bg-white border border-gray-300 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200'
                >
                    <FcGoogle size="20" />
                    <span className='font-medium text-gray-700'>Continue with Google</span>
                </button>

                <p className='mt-6 text-center text-sm text-gray-600'>
                    Don't have an account?{' '}
                    <Link to='/register' className='text-blue-600 font-medium hover:text-blue-800'>
                        Create account
                    </Link>
                </p>

                <div className='mt-8 pt-5 border-t border-gray-200'>
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

export default Login