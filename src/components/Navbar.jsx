'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// react icons
import { IoIosSearch } from 'react-icons/io'
import { CiMenuFries } from 'react-icons/ci'

const ResponsiveNavbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const router = useRouter()

  const navigateTo = (path) => {
    router.push(path)
    setMobileSidebarOpen(false) // Close mobile menu after navigation
  }

  return (
    <nav className="flex items-center justify-between w-full relative dark:bg-slate-900 bg-white rounded-full px-[10px] py-[8px]">
      {/* logo */}
      <img
        src="https://i.ibb.co/0BZfPq6/darklogo.png"
        alt="logo"
        className="w-[55px] cursor-pointer"
        onClick={() => navigateTo('/')}
      />

      {/* nav links */}
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
        <li onClick={() => navigateTo('/')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
          home
        </li>
        <li onClick={() => navigateTo('/admin/add-doctor/')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
          Add doctor
        </li>
        <li onClick={() => navigateTo('/admin/plans/')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
          Subscriptions
        </li>
        <li onClick={() => navigateTo('/shop')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
          shop
        </li>
      </ul>

      {/* action buttons */}
      <div className="items-center gap-[10px] flex">
        <button
          onClick={() => navigateTo('/login')}
          className="py-[7px] text-[1rem] px-[16px] dark:text-[#abc2d3] rounded-full capitalize hover:text-[#3B9DF8] transition-all duration-300 sm:flex hidden"
        >
          Sign in
        </button>
        <button
          onClick={() => navigateTo('/register')}
          className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden"
        >
          Sign up
        </button>

        <CiMenuFries
          className="text-[1.8rem] dark:text-[#abc2d3] mr-1 text-[#424242] cursor-pointer md:hidden flex"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      {/* mobile sidebar */}
      <aside
        className={`${
          mobileSidebarOpen ? 'translate-x-0 opacity-100 z-20' : 'translate-x-[200px] opacity-0 z-[-1]'
        } md:hidden bg-white p-4 text-center absolute top-[65px] dark:bg-slate-700 right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}
      >
        <div className="relative mb-5">
          <input
            className="py-1.5 pr-4 dark:bg-slate-800 dark:text-[#abc2d3] dark:border-slate-900/50 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]"
            placeholder="Search..."
          />
          <IoIosSearch className="absolute dark:text-slate-400 top-[8px] left-3 text-gray-500 text-[1.3rem]" />
        </div>
        <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <li onClick={() => navigateTo('/')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
            home
          </li>
          <li onClick={() => navigateTo('/features')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
            features
          </li>
          <li onClick={() => navigateTo('/blogs')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
            blogs
          </li>
          <li onClick={() => navigateTo('/shop')} className="cursor-pointer hover:text-[#3B9DF8] dark:text-[#abc2d3] relative before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute before:bottom-[-2px] before:rounded-full before:left-0 capitalize">
            shop
          </li>
        </ul>

        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => navigateTo('/login')}
            className="py-[7px] text-[1rem] px-[16px] dark:text-[#abc2d3] rounded-full capitalize hover:text-[#3B9DF8] transition-all duration-300 border"
          >
            Sign in
          </button>
          <button
            onClick={() => navigateTo('/register')}
            className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300"
          >
            Sign up
          </button>
        </div>
      </aside>
    </nav>
  )
}

export default ResponsiveNavbar
