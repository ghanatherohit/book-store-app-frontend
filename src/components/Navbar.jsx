import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { GoHeart } from "react-icons/go";
import { IoIosCart } from "react-icons/io";
import avatarImg from "../assets/avatar.png";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Orders", path: "/orders" },
  { name: "Cart", path: "/cart" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const cartItems = useSelector(state => state.cart.cartItems);
  const { currentUser, logOut } = useAuth();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  //explain the code
  //useEffect is a hook that allows you to perform side effects in function components.
  useEffect(() => {
    //handleClickOutside is a function that closes the dropdown when clicking outside of it.
    const handleClickOutside = (event) => {
      //if dropdownRef.current is not null and the clicked element is not inside the dropdown, close the dropdown.
      //event.target is the element that triggered the event.
      //contains() is a method that checks if an element is a descendant of another element.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    //addEventListener is a method that attaches an event handler to the specified element.
    //mousedown is an event that occurs when the user presses a mouse button.
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut();
    setIsDropdownOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 max-w-screen-2xl mx-auto px-6 py-4  ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
        }`}
    >
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-10 gap-4">
          {/* Logo/Menu icon */}
          <Link to="/" className="flex items-center gap-2 transition-transform">
            <HiMiniBars3CenterLeft className="size-6 text-primary hover:scale-105 opacity-90" />
            <span className="text-xl font-semibold hidden sm:block text-gray-800">BookStore</span>
          </Link>

          {/* Search bar */}
          <div className="relative sm:w-72 w-40">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdSearch className="size-5 text-gray-400" />
            </div>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search books..."
              className="bg-gray-100 w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center justify-center gap-1 h-10 rounded-full px-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <IoIosCart className="size-6" />
            {cartItems.length > 0 && (
              <span className="bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User avatar */}
          {/* ref is a special attribute that can be attached to any component in React. It is used to reference a component in a class component or a DOM element in a functional component. */}
          {/* The ref attribute is used to return a reference to the element. Refs are commonly used to access the DOM nodes or React elements created in the render method.*/}
          <div id="avatar" className="relative" ref={dropdownRef}>
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center h-10 w-10 rounded-full hover:ring-4 hover:ring-gray-200 transition-all"
                >
                  <img
                    src={avatarImg}
                    alt="User avatar"
                    className={`size-9 rounded-full object-cover ${currentUser ? "ring-2 ring-primary" : ""
                      }`}
                  />
                </button>

                {/* User dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 py-2 bg-white rounded-lg shadow-xl border border-gray-100 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">{currentUser.displayName || "User"}</p>
                      <p className="text-xs text-gray-400">{currentUser.email}</p>
                    </div>
                    <ul className="py-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li className="border-t border-gray-100 mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 py-2 px-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <HiOutlineUser className="size-5" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
