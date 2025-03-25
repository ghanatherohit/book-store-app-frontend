import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/Cart/cartSlice';
import Swal from 'sweetalert2';

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // Reduce method calculates the total price of all items in the cart and then rounds it to 2 decimal places by using the toFixed() method.
    // Here total acts as an accumulator which is initialized to 0 and item is the current item in the cartItems array.
    const totalPrice = cartItems.reduce((total, item) => total + item.newPrice, 0).toFixed(2);
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }
    return (<>
        <div className="flex mt-12 h-full flex-col bg-white shadow-xl my-10 p-4 md:p-6 rounded-md transition-all">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <div className="font-medium text-gray-950 text-3xl">Shopping cart</div>
                    <div className="ml-3 flex h-7 items-center ">
                        <button
                            type="button"
                            onClick={handleClearCart}
                            className="relative -m-2 py-2 px-3 text-lg bg-red-500 text-white rounded-md hover:bg-yellow-400 transition-all duration-200  "
                        >
                            <span className="">Clear Cart</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flow-root">

                        {
                            cartItems.length > 0 ? (
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    <li className='mt-3 p-3 flex flex-row justify-end text-xl font-medium'><p>Price</p></li>
                                    {
                                        cartItems.map((product) => (
                                            <li key={product?._id} className="flex py-6">
                                                {/* <!-- Product image --> */}
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        alt=""
                                                        src={`${getImgUrl(product?.coverImage)}`}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                {/* <!-- Product details --> */}
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    {/* <!-- Product title and newPrice --> */}
                                                    <div>
                                                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <Link to='/'>{product?.title}</Link>
                                                            </h3>
                                                            <p className="sm:ml-4">${product?.newPrice}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category: </strong>{product?.category}</p>
                                                    </div>
                                                    {/* <!-- Product quantity and remove button --> */}
                                                    <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                        <p className="text-gray-500"><strong>Qty:</strong> 1</p>
                                                        {/* <!-- Remove button --> */}
                                                        <div className="flex">
                                                            <button
                                                                onClick={() => handleRemoveFromCart(product)}
                                                                type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : (
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    <li className='mt-3 p-3 flex flex-row justify-end text-xl font-medium'><p>Price</p></li>
                                    <p className='w-full py-10 flex justify-center align-middle text-lg'>No books found!</p>
                                </ul>
                            )
                        }


                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 px-5 py-6 sm:px-6 ">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p className='font-semibold text-xl'>${totalPrice ? totalPrice : 0}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                    <Link onClick={() => {
                        if (cartItems.length === 0) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Your cart is empty!",
                                timer: 2000,
                                //when a user clicks ok, they will be redirected to the homepage
                                willClose: () => navigate('/'),
                                confirmButtonText: 'Continue Shopping',
                            });
                            return;
                        }
                    }}
                        to="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        Checkout
                    </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <Link to="/">
                        or
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    </>)
}

export default Cart
