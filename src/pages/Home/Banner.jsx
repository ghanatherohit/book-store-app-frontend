import React from "react";
import bannerImg from "../../assets/structureBook.png";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Banner = () => {
  const { currentUser } = useAuth();

  // Container animation with stagger for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.3 },
    },
  };

  // Child elements animation: slight upward motion and fade-in
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-10 pb-20 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row-reverse items-center gap-20 overflow-hidden"
    >
      <motion.div
        variants={childVariants}
        className="w-full lg:w-1/2 flex justify-center items-center"
      >
        <img
          src={bannerImg}
          alt="Banner"
          className="w-full max-w-lg h-auto rounded-xl transform transition-transform duration-700"
        />
      </motion.div>
      <motion.div
        variants={childVariants}
        className="w-full lg:w-1/2 text-gray-900 space-y-6"
      >
        <h1 className="md:text-5xl text-2xl font-bold mb-7 tracking-wide">
          Welcome to the Bookstore{currentUser ? `, ${currentUser.displayName}` : ""}
        </h1>
        <p className="text-xl text-gray-700">
          Discover a curated collection of timeless classics and modern bestsellers.
          Our bookstore is your gateway to adventures, deep insights, and unforgettable
          journeys through the world of literature.
        </p>
        <motion.button
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out"
        >
          Subscribe
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
