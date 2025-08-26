import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth();
  const [productOpen, setProductOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout successful!");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Monaro Crafts</span>
        </Link>

        <div className="flex md:order-2 items-center gap-3">
          {user ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Profile
                </button>
                {profileOpen && (
                
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 dark:bg-gray-800">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-white border-b">
                        @{user.email.split('@')[0]}
                    </div>
                    <Link to="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">My Cart</Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Profile</Link>
                  
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {user.role === 'admin' && (
                <Link
                  to="/dashboard"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Dashboard
                </Link>
              )}
              <Link to="/cart" className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-4 py-2">
                Cart
              </Link>
            </>
          ) : (
            <>
            <Link to="/cart" className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-4 py-2">
                Cart
              </Link>
              <Link to="/signup" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2">Sign up</Link>
              <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2">Login</Link>
              
            </>
          )}
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <Link to="/" className="block py-2 px-3 text-blue-700" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 text-gray-700 dark:text-white hover:text-blue-700">About</Link>
            </li>

            {/* Product Dropdown */}
            <li className="relative">
              <button
                onClick={() => setProductOpen(!productOpen)}
                className="block py-2 px-3 text-gray-700 dark:text-white hover:text-blue-700"
              >
                Products ▼
              </button>
              {productOpen && (
                <ul className="absolute left-0 mt-1 w-48 bg-white border rounded shadow-lg dark:bg-gray-800 z-40">
                  <li>
                    <Link to="/products/earrings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Earrings</Link>
                  </li>
                  <li>
                    <Link to="/products/necklaces" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Necklaces</Link>
                  </li>
                  <li>
                    <Link to="/products/bracelets" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Bracelets</Link>
                  </li>
                  <li>
                    <Link to="/products/keytags" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Keytags</Link>
                  </li>
                  
                  <li className="relative group">
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Other ▶
                    </span>
                    <ul className="absolute top-0 left-full mt-0 ml-1 w-48 bg-white border rounded shadow-lg hidden group-hover:block dark:bg-gray-800">
                      <li>
                        <Link to="/products/scrunchies" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Scrunchies</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/contact" className="block py-2 px-3 text-gray-700 dark:text-white hover:text-blue-700">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
