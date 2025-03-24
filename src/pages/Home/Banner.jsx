import React from "react";
import bannerImg from "../../assets/banner.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 px-4 md:px-12 lg:px-24  justify-between items-center gap-12 transition-all duration-300">
      <div className="flex md:w-1/2 w-full justify-center items-center md:justify-end">
        <img src={bannerImg} alt="Banner" className="max-w-full h-auto" />
      </div>
      <div className="md:w-1/2 w-full text-gray-800">
        <h1 className="md:text-5xl text-3xl font-bold mb-7 tracking-wide">
          New Releases This Week
        </h1>
        <p className="mb-10 leading-relaxed">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-full shadow hover:bg-secondary transition duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Banner;
