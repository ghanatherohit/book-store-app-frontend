import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useFetchBookByIdQuery } from '../../redux/features/Books/booksApi'
import Loading from '../../components/Loading'
import InputField from './ui/InputField'
import SelectField from './ui/SelectField'
import getBaseUrl from '../../utils/baseUrl'

const UpdateBook = () => {
    const { id } = useParams()
    const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id)
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title)
            setValue('description', bookData.description)
            setValue('category', bookData.category)
            setValue('trending', bookData.trending)
            setValue('oldPrice', bookData.oldPrice)
            setValue('newPrice', bookData.newPrice)
            setValue('coverImage', bookData.coverImage)
        }
    }, [bookData, setValue])

    const onSubmit = async (data) => {
        const updateBookData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: data.coverImage || bookData.coverImage,
        }
        try {
            await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            Swal.fire({
                title: 'Book Updated',
                text: 'Your book is updated successfully!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: "Okay!",
            })
            await refetch()
        } catch (error) {
            console.error('Failed to update book.', error)
            Swal.fire({
                title: 'Update Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    }

    if (isLoading) return <Loading />
    if (isError)
        return (
            <div className="text-center text-red-500 font-semibold text-lg mt-10">
                Failed to load book
            </div>
        )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 hover:bg-gray-100 transition-all duration-150">
            <div className="max-w-xl w-full bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Update Book Details
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <InputField
                        label="Title"
                        name="title"
                        placeholder="Enter book title"
                        register={register}
                        containerClass="mb-4"
                    />
                    <InputField
                        label="Description"
                        name="description"
                        placeholder="Enter book description"
                        type="textarea"
                        register={register}
                        containerClass="mb-4"
                    />
                    <SelectField
                        label="Category"
                        name="category"
                        options={[
                            { value: '', label: 'Choose A Category' },
                            { value: 'business', label: 'Business' },
                            { value: 'technology', label: 'Technology' },
                            { value: 'fiction', label: 'Fiction' },
                            { value: 'horror', label: 'Horror' },
                            { value: 'adventure', label: 'Adventure' },
                        ]}
                        register={register}
                        containerClass="mb-4"
                    />
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            checked={!!watch("trending")}
                            onChange={(e) => setValue("trending", e.target.checked)}
                            className="h-5 w-5 text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <label className="ml-2 text-gray-700 font-medium">Trending</label>
                    </div>
                    <InputField
                        label="Old Price"
                        name="oldPrice"
                        type="text"
                        placeholder="Old Price"
                        register={register}
                        containerClass="mb-4"
                    />
                    <InputField
                        label="New Price"
                        name="newPrice"
                        type="text"
                        placeholder="New Price"
                        register={register}
                        containerClass="mb-4"
                    />
                    <InputField
                        label="Cover Image URL"
                        name="coverImage"
                        type="text"
                        placeholder="Enter cover image URL"
                        register={register}
                        containerClass="mb-6"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                    >
                        Update Book
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateBook