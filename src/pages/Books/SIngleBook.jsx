import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/Books/booksApi';
import { addToCart } from '../../redux/features/Cart/cartSlice';
import Loading from '../../components/Loading';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    window.scrollTo(0, 0);

    if (isLoading) {
        return (
            <Loading />
        )
    }
    if (isError) return (
        <div className="flex flex-col items-center justify-center h-screen text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-xl">Error fetching orders. Please try again later.</p>
        </div>
    )
    return (
        <div className="flex flex-col gap-15 p-10 items-center transition-all duration-300 w-fit justify-center m-auto mt-10 ">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className='flex flex-col md:flex-row gap-10'>
                <div className=''>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div>
                <div>
                    <div className='mb-5'>
                        <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
                        <p className="text-gray-700 mb-4">
                            <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-4 capitalize">
                            <strong>Category:</strong> {book?.category}
                        </p>
                        <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
                    </div>

                    <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                        <FiShoppingCart className="" />
                        <span>Add to Cart</span>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleBook