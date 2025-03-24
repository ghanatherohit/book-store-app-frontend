import React, { useState } from 'react';
import InputField from './ui/InputField';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddBookMutation } from '../../redux/features/Books/booksApi';
import SelectField from './ui/SelectField';

const AddNewBook = () => {
  const options = [
    { value: '', label: 'Choose A Category' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'horror', label: 'Horror' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'romance', label: 'Romance' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'biography', label: 'Biography' },
    { value: 'history', label: 'History' },
    { value: 'science', label: 'Science' },
    { value: 'cookbook', label: 'Cookbook' },
    { value: 'health', label: 'Health' },
    { value: 'travel', label: 'Travel' },
    { value: 'children', label: 'Children' },
    { value: 'comics', label: 'Comics' },
    { value: 'poetry', label: 'Poetry' },
    { value: 'self-help', label: 'Self-Help' },
    { value: 'religious', label: 'Religious' },
    { value: 'other', label: 'Other' },
  ];
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [addBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: 'Success',
        text: 'Book added successfully',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Okay!',
      });
      reset();
      setImageFileName('');
      setImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while adding the book',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Okay!',
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 hover:bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Book</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Title"
            name="title"
            register={register}
            placeholder="Enter book title"
          />
          <InputField
            label="Description"
            name="description"
            placeholder="Enter book description"
            type="textarea"
            register={register}
          />
          <SelectField
            label="Category"
            name="category"
            options={options}
            register={register}
          />
          <div className="flex items-center">
            <input
              id="trending"
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-blue-300"
            />
            <label htmlFor="trending" className="ml-2 text-md font-medium text-gray-700">
              Trending
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Old Price"
              name="oldPrice"
              type="float"
              placeholder="Old Price"
              register={register}
            />
            <InputField
              label="New Price"
              name="newPrice"
              type="float"
              placeholder="New Price"
              register={register}
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500 w-full"
            />
            {imageFileName && (
              <p className="mt-1 text-sm text-gray-500">Selected: {imageFileName}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 text-center text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
