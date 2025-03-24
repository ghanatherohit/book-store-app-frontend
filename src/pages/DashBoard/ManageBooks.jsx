import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../redux/features/Books/booksApi';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';

const ManageBooks = () => {
    const navigate = useNavigate();
    const { data: books, refetch, isLoading, isError } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            Swal.fire({
                title: 'Success',
                text: 'Book deleted successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            refetch();
        } catch (error) {
            console.error('Failed to delete book:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete book. Please try again.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <section className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Books</h2>
                <div className="bg-white shadow rounded-lg p-6">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">All Books</h3>
                        <Link 
                            to="/dashboard/add-new-book" 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none transition duration-150 mt-2 sm:mt-0"
                        >
                            Add New Book
                        </Link>
                    </div>
                    
                    {isLoading ? (
                        <Loading />
                    ) : isError ? (
                        <div className="text-center text-red-500 font-semibold text-lg">Failed to load books</div>
                    ) : (
                        <>
                            {/* Desktop Table view (lg and above) */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {books && books.map((book, index) => (
                                            <tr key={book._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{book.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${book.newPrice}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex space-x-2">
                                                        <Link 
                                                            to={`/dashboard/edit-book/${book._id}`} 
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs transition duration-150"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteBook(book._id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition duration-150"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Mobile Card view (sm and below) */}
                            <div className="grid grid-flow-row gap-4 lg:grid-cols-1 sm:grid-cols-2 mt-4 lg:hidden">
                                {books && books.map((book,index) => (
                                    <div key={book._id} className="bg-white shadow rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold text-gray-800">{index+1}. {book.title}</h4>
                                            <span className="text-gray-600">${book.newPrice}</span>
                                        </div>
                                        <p className="text-gray-600 mt-1">Category: {book.category}</p>
                                        <div className="mt-3 flex space-x-2">
                                            <Link 
                                                to={`/dashboard/edit-book/${book._id}`} 
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs transition duration-150"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition duration-150"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ManageBooks;
