import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetchAllBooksQuery } from "../../redux/features/Books/booksApi";
import { ThreeDots } from "react-loader-spinner";

const Recommended = () => {
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   fetch("books.json")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  const { data: books = [], isLoading, error} = useFetchAllBooksQuery();

  return (
    <div className="py-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Recommended for You
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Handpicked selections based on your reading preferences and trending titles
          </p>
        </div>
      </div>
      <Swiper
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}

        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1320: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          isLoading && (
            <div className="flex justify-center items-center h-96">
              <p className="text-2xl text-gray-800 p-2">Loading </p>
              <ThreeDots color="#f59e0b" height={50} width={50} />
            </div>
          )
        }
        {
          error && (
            <div className="flex items-center justify-center bg-red-50 h-96">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="font-bold text-xl mb-2">Something went wrong</h2>
                <p className="text-gray-600 mb-6">{error.message}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300"
                >
                  Try again
                </button>
              </div>
            </div>
          )
        }

        {books?.length > 0 &&
          books.slice(8, 18).map((book, index) => (
            <SwiperSlide className="py-10" key={index}>
              <BookCard key={index} book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
