import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { Analytics } from "@vercel/analytics/react"
//Outlet: Children elements in router 

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Analytics />
        <main className='min-h-screen max-w-screen-2xl mx-auto px-5 py-6 font-primary'>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
