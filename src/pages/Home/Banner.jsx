import React from "react";
import bannerImg from "../../assets/structureBook.png";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Banner = () => { 
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col md:flex-row-reverse py-16 px-4 md:px-12 lg:px-24  justify-between items-center gap-12 transition-all duration-300">
      <div className="flex md:w-1/2 w-full justify-center items-center md:justify-end">
        <img src={bannerImg} alt="Banner" className="max-w-[32rem] h-auto" />
      </div>
      <div className="md:w-1/2 w-full text-gray-800">
        <h1 className="md:text-5xl text-3xl font-bold mb-7 tracking-wide">
          Welcome to the Bookstore {currentUser ? `, ${currentUser.displayName}` : ""}
        </h1>
        <p className="mb-10 leading-relaxed">
          Discover a curated collection of timeless classics and modern bestsellers. Our bookstore is your gateway to adventures, deep insights, and unforgettable journeys through the world of literature. Enjoy exclusive finds and regular updates on the newest trends in reading.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-full shadow hover:bg-secondary transition duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Banner;
