import React, { useEffect, useState } from 'react'
import { useGetOrdersByUserEmailQuery } from '../../redux/features/Orders/ordersApi'
import { useAuth } from '../../context/AuthContext'
import { FaBox, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'
import { motion } from 'framer-motion'
import axios from 'axios'
import getBaseUrl from '../../utils/baseUrl'
import { getImgUrl } from '../../utils/getImgUrl'

const OrdersPage = () => {
    window.scrollTo(0, 0);
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrdersByUserEmailQuery(currentUser?.email);
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/books`)
                setBooks(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    console.log(books)

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
        </div>
    )

    if (isError) return (
        <div className="flex flex-col items-center justify-center h-screen text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-xl">Error fetching orders. Please try again later.</p>
        </div>
    )

    return (
        <div className='container mx-auto p-4 transition-all max-w-5xl'>
            <h1 className='text-4xl font-bold p-2 mb-8 border-b-2 border-secondary'>My Orders</h1>
            {
                orders.length === 0 ? (
                    <div className='w-full flex flex-col items-center justify-center h-[60vh] text-gray-500'>
                        <FaBox className="text-6xl mb-4 text-secondary opacity-50" />
                        <p className="text-2xl">No orders found</p>
                        <button className="mt-6 bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className='space-y-8'>
                        {orders.map((order, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className='bg-white rounded-xl shadow-lg overflow-hidden'
                                key={order._id}
                            >
                                <div className='bg-secondary text-white p-4 flex justify-between items-center'>
                                    <div className="flex items-center gap-2">
                                        <span className='text-lg font-semibold'>Order #{orders.length - index}</span>
                                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                                            {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium">
                                        ID: {order._id.substr(0, 8)}...
                                    </div>
                                </div>

                                <div className='p-6'>
                                    {/* User details */}
                                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                                        <div className='space-y-3'>
                                            <div className='flex items-center gap-2'>
                                                <FaUser className="text-secondary" />
                                                <p><span className='font-medium'>Name:</span> {order.name}</p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <FaEnvelope className="text-secondary" />
                                                <p><span className='font-medium'>Email:</span> {order.email}</p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <FaPhone className="text-secondary" />
                                                <p><span className='font-medium'>Phone:</span> {order.phone}</p>
                                            </div>
                                        </div>

                                        <div className='p-4 bg-gray-50 rounded-lg'>
                                            <div className='flex items-start gap-2'>
                                                <FaMapMarkerAlt className="text-secondary mt-1" />
                                                <div>
                                                    <h3 className='font-medium mb-2'>Shipping Address:</h3>
                                                    <p className="text-gray-700">{order.address.street}</p>
                                                    <p className="text-gray-700">
                                                        {order.address.city}, {order.address.country}, {order.address.zipCode}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order items */}
                                    <div className='mt-6 border-t pt-6'>
                                        <h3 className='font-medium mb-4 text-lg'>Order Items</h3>
                                        <div className='space-y-4'>
                                            {
                                                order.productIds.map((id, index) => {
                                                    const book = books.find((book) => book._id === id)
                                                    return (
                                                        <div className='flex items-center gap-4' key={index}>
                                                            <img src={`${getImgUrl(book?.coverImage)}`} alt={book?.title} className='w-16 h-16 object-cover rounded-lg' />
                                                            <div className='flex-1'>
                                                                <h4 className='font-semibold'>{book?.title}</h4>
                                                                <p className='text-gray-600'>${book?.newPrice}</p>
                                                            </div>
                                                            <span className='text-gray-600'>Qty: 1</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className='mt-6 flex justify-between items-center pt-4 border-t'>
                                            <span>Total Items: {order.productIds.length}</span>
                                            <span className='font-bold text-xl'>${order.totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default OrdersPage