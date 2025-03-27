import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../../components/Loading'
import getBaseUrl from '../../utils/baseUrl'
import { MdErrorOutline, MdIncompleteCircle } from "react-icons/md"
import RevenueChart from './RevenueChart'
import { GiOpenBook, GiProfit } from "react-icons/gi"
import { FaArrowTrendDown } from "react-icons/fa6"

const users = [
  {
    name: "Annette Watson",
    rating: "9.3",
    img: "https://randomuser.me/api/portraits/women/82.jpg",
    profileUrl: "/profile/annette-watson"
  },
  {
    name: "Calvin Steward",
    rating: "8.9",
    img: "https://randomuser.me/api/portraits/men/81.jpg",
    profileUrl: "/profile/calvin-steward"
  },
  {
    name: "Ralph Richards",
    rating: "8.7",
    img: "https://randomuser.me/api/portraits/men/80.jpg",
    profileUrl: "/profile/ralph-richards"
  },
  {
    name: "Bernard Murphy",
    rating: "8.2",
    img: "https://randomuser.me/api/portraits/men/79.jpg",
    profileUrl: "/profile/bernard-murphy"
  },
  {
    name: "Arlene Robertson",
    rating: "8.2",
    img: "https://randomuser.me/api/portraits/women/78.jpg",
    profileUrl: "/profile/arlene-robertson"
  },
  {
    name: "Jane Lane",
    rating: "8.1",
    img: "https://randomuser.me/api/portraits/women/77.jpg",
    profileUrl: "/profile/jane-lane"
  },
  {
    name: "Pat Mckinney",
    rating: "7.9",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
    profileUrl: "/profile/pat-mckinney"
  },
  {
    name: "Norman Walters",
    rating: "7.7",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    profileUrl: "/profile/norman-walters"
  },
  {
    name: "Elsie Mccoy",
    rating: "7.6",
    img: "https://randomuser.me/api/portraits/men/74.jpg",
    profileUrl: "/profile/elsie-mccoy"
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setData(response.data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <Loading />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 text-red-500">
        <MdErrorOutline className="h-12 w-12" />
        <p className="text-lg">{error}</p>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Dashboard header */}
      <div>
        <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
        <h2 className="text-gray-500 pb-5">Book Store Inventory</h2>
      </div>

      {/* First row of dashboard */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Books */}
        <div className="h-28 flex items-center p-8 bg-purple-200 shadow-lg rounded-lg transition hover:shadow-xl hover:scale-105 text-purple-800">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-purple-50 rounded-full mr-6">
            <GiOpenBook className="w-8 h-8" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalBooks}</span>
            <span className="block">Products</span>
          </div>
        </div>
        {/* Total Sales */}
        <div className="h-28 flex items-center p-8 bg-green-200 shadow-lg rounded-lg transition hover:shadow-xl hover:scale-105 text-green-800">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-green-50 rounded-full mr-6">
            <GiProfit className="w-8 h-8" />
          </div>
          <div>
            {/* Total Sales round of to 2 decimal places */}
            <span className="block text-2xl font-bold">{data?.totalSales.toFixed(2)}</span>
            <span className="block">Total Sales</span>
          </div>
        </div>
        {/* Trending Books */}
        <div className="h-28 flex items-center p-8 bg-red-200 shadow-lg rounded-lg transition hover:shadow-xl hover:scale-105 text-red-800">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-red-50 rounded-full mr-6">
            <FaArrowTrendDown className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">{data?.trendingBooks}</span>
            <span className="block">Trending Books</span>
          </div>
        </div>
        {/* Total Orders */}
        <div className="h-28 flex items-center p-8 bg-blue-200 shadow-lg rounded-lg transition hover:shadow-xl hover:scale-105 text-blue-800">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-50 rounded-full mr-6">
            <MdIncompleteCircle className="w-8 h-8" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalOrders}</span>
            <span className="block">Total Orders</span>
          </div>
        </div>
      </section>

      {/* Second row of dashboard */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Orders per month chart */}
        <div className="flex flex-col item-center col-span-1 md:col-span-2 md:row-span-2 shadow-lg rounded-lg transition hover:shadow-xl text-gray-800 h-[450px]">
          <div className="px-6 py-5 font-semibold border-b border-gray-200 text-center">
            The number of orders per month
          </div>
          <div className="p-4 max-h-screen ">
              <RevenueChart />
          </div>
        </div>
        {/* Users by average order */}
        <div className="shadow-lg rounded-lg transition hover:shadow-xl text-gray-700 ">
          <div className="flex justify-between items-center px-6 py-5 font-semibold border-b border-gray-200">
            <span>Users by average order</span>
            <select className="px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="year">This year</option>
            </select>
          </div>
          <div className="overflow-y-auto h-96">
            <ul className="p-6 space-y-4">
              {users.map((user, index) => (
                <li key={index} className="flex items-center">
                  <a href={user.profileUrl} className="flex items-center">
                    <div className="h-10 w-10 mr-3 bg-gray-200 rounded-full overflow-hidden">
                      <img src={user.img} alt={`${user.name} profile picture`} />
                    </div>
                    <span>{user.name}</span>
                  </a>
                  <span className="ml-auto font-semibold">{user.rating}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>  
      
    </div>
  )
}

export default Dashboard
