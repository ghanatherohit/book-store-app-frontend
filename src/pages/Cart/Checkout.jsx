import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/Orders/ordersApi';
import Swal from 'sweetalert2';
import { clearCart } from '../../redux/features/Cart/cartSlice';

const Checkout = () => {
  
  window.scrollTo(0, 0)
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.cartItems);
  if (!cartItems ){
    navigate('/')
  }
  const dispatch = useDispatch()
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const [isChecked, setIsChecked] = useState(false)
  const onSubmit = (data) => {
    console.log(data)
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        street: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zipCode: data.zipcode

      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id),
      totalPrice: totalPrice,
    }
    // console.log(newOrder)
    try {
      if (!newOrder) return
      if (cartItems.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your cart is empty!",
          timer: 2000,
          timerProgressBar: true,
          //when a user clicks ok, they will be redirected to the homepage
          willClose: () => navigate('/'),
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 1000);
          },
          footer: '<a href="/">Continue Shopping</a>'
        });
      }
      createOrder(newOrder)
      navigate('/orders')
      handleClearCart()
      Swal.fire({
        title: "Order Placed Successfully",
        text: "Thank you for shopping with us!",
        icon: "success",
        timer: 2500,
      });
    } catch (error) {
      console.error("Failed to create order", error)
    }
  }

  {
    const check = document.querySelector('button[type="submit"]')
    check.addEventListener('keyup', (e) => {
      if (e.enter) {
        e.preventDefault()
          .click()
      }
    })
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mb-4"></div>
        <p className="text-blue-800 font-medium">Processing your order...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="font-bold text-xl mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300"
        >
          Return to Cart
        </button>
      </div>
    </div>
  );
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            {/* Order Summary Card */}
            <div className="mb-8 bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-[1.01]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-2xl text-gray-800">Complete Your Order</h2>
                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">Cash On Delivery</span>
              </div>
              
              <div className="border-t border-gray-100 pt-4 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600">Items</p>
                  <p className="font-medium">{cartItems.length}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-bold text-xl text-blue-700">${totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-5 text-white">
                <h3 className="text-xl font-medium">Enter Shipping Details</h3>
                <p className="opacity-90">Please complete all required fields</p>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                  {/* Personal Info Section */}
                  <div className="lg:col-span-2">
                    <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
                      Personal Information
                    </h4>
                    
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {/* Full name field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          {...register("name", { required: true })}
                          type="text"
                          name="name"
                          id="name"
                          className="w-full px-4 py-2.5 rounded-lg border focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all"
                          required 
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                      </div>

                      {/* Phone field */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          {...register("phone", { required: true })}
                          type="phone"
                          name="phone"
                          id="phone"
                          className="w-full px-4 py-2.5 rounded-lg border focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all"
                          placeholder="+123 456 7890"
                          required
                        />
                        {errors.phone && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                      </div>
                      
                      {/* Email field */}
                      <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 text-gray-500 cursor-not-allowed"
                          disabled
                          defaultValue={currentUser?.email}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Section */}
                  <div className="lg:col-span-2 pt-4">
                    <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
                      Shipping Address
                    </h4>
                    
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {/* Address field */}
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          {...register("address", { required: true })}
                          type="text"
                          name="address"
                          id="address"
                          className="w-full px-4 py-2.5 rounded-lg border focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all"
                          required 
                        />
                        {errors.address && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                      </div>

                      {/* City field */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          {...register("city", { required: true })}
                          type="text"
                          name="city"
                          id="city"
                          className="w-full px-4 py-2.5 rounded-lg border focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all"
                          required 
                        />
                        {errors.city && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                      </div>

                      {/* State field */}
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                        <input
                          {...register("state", { required: true })}
                          type="text"
                          name="state"
                          id="state"
                          className="w-full px-4 py-2.5 rounded-lg border focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all"
                          required 
                        />
                        {errors.state && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                      </div>

                      {/* Country field */}
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          {...register("country", { required: true })}
                          type="text"
                          name="country"
                          id="country"
                          className="w-full px-4 py-2.5 rounded-lg border focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all"
                          required 
                        />
                        {errors.country && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                      </div>

                      {/* Zipcode field */}
                      <div>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">Zipcode</label>
                        <input
                          {...register("zipcode", { required: true })}
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          className="w-full px-4 py-2.5 rounded-lg border focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all"
                          required 
                        />
                        {errors.zipcode && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terms checkbox */}
                <div className="mt-8 pt-4 border-t">
                  <div className="flex items-start">
                    <input
                      onChange={(e) => setIsChecked(e.target.checked)}
                      type="checkbox" 
                      name="billing_same" 
                      id="billing_same" 
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500" 
                    />
                    <label htmlFor="billing_same" className="ml-2 block text-sm text-gray-700">
                      I have read and agree to the 
                      <Link to="/terms" className="text-blue-600 hover:text-blue-800 underline ml-1 mr-1">Terms & Conditions</Link>
                      and
                      <Link to="/policy" className="text-blue-600 hover:text-blue-800 underline ml-1">Shopping Policy</Link>.
                    </label>
                  </div>
                  {!isChecked && (
                    <p className="text-sm text-gray-500 mt-2">Please agree to our terms to continue</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => navigate('/cart')}
                    className="text-gray-600 font-medium flex items-center"
                  > ← Return to cart
                  </button>
                  
                  <button
                    disabled={!isChecked}
                    type="submit"
                    className={`px-6 py-3 rounded-lg text-white font-medium flex items-center
                      ${isChecked 
                        ? "bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all shadow-md" 
                        : "bg-blue-300 cursor-not-allowed"}`}
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout