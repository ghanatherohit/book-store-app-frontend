import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFolder } from "react-icons/lu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import { BiBookAdd } from "react-icons/bi";
import { useLocation } from 'react-router-dom';


const DashboardLayout = () => {

  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "bg-white text-indigo-600" : "hover:bg-indigo-600 hover:text-white";
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/")
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="flex min-h-screen overflow-hidden bg-gray-50">
      {/* Sidebar for navigation, hidden on small screens */}
      <aside className={`md:flex md:flex-col ${sidebarOpen ? 'flex flex-col' : 'hidden'}`}>
        {/* Logo link that redirects to the homepage */}
        <Link to="/" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
          {/* Book logo image */}
          <img src="/book.png" alt="Book logo" className="h-10 w-auto" />
        </Link>
        {/* Navigation container*/}
        <div className="flex-grow flex flex-col justify-between text-white bg-gradient-to-b from-indigo-700 to-purple-700 shadow-lg">
          {/* Navigation menu */}
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            {/* Dashboard link with active styles */}
            <Link to="/dashboard" className={`inline-flex items-center justify-center py-3 rounded-lg transition-colors duration-200 ${isActive('/dashboard')}`}>
              <span className="sr-only">Dashboard</span>
              {/* SVG icon representing the dashboard view */}
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>
            {/* Link to add a new book, uses the imported HiViewGridAdd icon */}
            <Link to="/dashboard/add-new-book" className={`inline-flex items-center justify-center py-3 rounded-lg transition-colors duration-200 ${isActive('/dashboard/add-new-book')}`}>
              <span className="sr-only">Add New Book</span>
              <HiViewGridAdd className="h-6 w-6" />
            </Link>
            {/* Link to manage books, uses the imported MdOutlineManageHistory icon */}
            <Link to="/dashboard/manage-books" className={`inline-flex items-center justify-center py-3 rounded-lg transition-colors duration-200 ${isActive('/dashboard/manage-books')}`}>
              <span className="sr-only">Manage Books</span>
              <MdOutlineManageHistory className="h-6 w-6" />
            </Link>
          </nav>
          {/* Bottom section of the sidebar for settings */}
          <div className="flex items-center justify-center h-20 border-t border-indigo-600">
            {/* Button for settings (functionality can be added as needed) */}
            <button className="p-3 hover:bg-indigo-600 rounded-lg transition-colors duration-200">
              <span className="sr-only">Settings</span>
              {/* Settings icon */}
              <IoSettingsOutline className="stroke-current text-white h-6 w-6" />
            </button>
          </div>
        </div>
      </aside>
      {/* Main content container for dashboard details */}
      <div className="flex-grow text-gray-800">
        {/* Header section with search bar, user info, and action buttons */}
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white shadow-md ">
          {/* Hamburger menu button for mobile view */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="block sm:hidden p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <span className="sr-only">Menu</span>
            {/* Hamburger menu icon */}
            <HiOutlineMenuAlt2 className="h-6 w-6" />
          </button>
          {/* Search bar container */}
          <div className="relative w-full max-w-md m-2">
            {/* Search icon */}
            <IoIosSearch className="absolute top-2 left-3 text-gray-400 size-6" />
            {/* Search input field */}
            <input type="text" role="search" placeholder="Search..." className="py-2 pl-10 pr-4 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg transition-colors duration-200" />
          </div>
          {/* User information and action buttons */}
          <div className="flex items-center ml-auto">
            {/* User menu button */}
            <button className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <span className="sr-only">User Menu</span>
              {/* Desktop: user name and role info */}
              <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                <span className="font-semibold">Ghanathe Rohit</span>
                <span className="text-sm text-gray-600">Admin</span>
              </div>
              {/* User profile image */}
              <span className="h-12 w-12 ml-2 mr-2 bg-gray-100 rounded-full overflow-hidden">
                <img src="/coder.jpg" alt="User profile" className="h-full w-full object-cover" />
              </span>
              {/* Arrow icon visible on small devices */}
              <MdKeyboardArrowDown className="hidden md:block h-6 w-6 text-gray-600" />
            </button>
            {/* Container for notifications and logout buttons */}
            <div className="flex space-x-2 border-l border-gray-200 pl-3 ml-3">
              {/* Notification button with a red dot badge */}
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                <span className="sr-only">Notifications</span>
                {/* Red dot indicating unread notifications */}
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                {/* SVG icon representing notifications */}
                <MdNotificationsNone className='size-6 text-gray-500' />
              </button>
              {/* Logout button: calls handleLogout function on click */}
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <span className="sr-only">Log out</span>
                {/* Icon representing logout */}
                <TbLogout className='size-6 text-gray-500' />
              </button>
            </div>
          </div>
        </header>
        {/* Main section area for page-specific content */}
        <main className="p-6 sm:p-10 space-y-6">
          {/* Outlet renders the nested routes */}
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default DashboardLayout


{
  {/* Header row for the dashboard title and action links */ }
  <div className="flex flex-col md:flex-row items-center justify-between">
    {/* Action buttons for managing books and adding a new book */}
    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
      {/* Button linking to the manage books page */}
      <Link to="/dashboard/manage-books" className="inline-flex items-center px-5 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-200">
        {/* Icon for manage books */}
        <RiEdit2Line className="h-6 w-6 m-1" />
        Manage Books
      </Link>
      {/* Button linking to the add new book page */}
      <Link to="/dashboard/add-new-book" className="inline-flex items-center px-5 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200">
        {/* Icon for adding a new book */}
        <BiBookAdd className='size-6 m-1' />
        Add New Book
      </Link>
    </div>
  </div>

}