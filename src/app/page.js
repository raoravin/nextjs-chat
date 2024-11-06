// app/homepage/page.js

import { FaSignInAlt, FaUser } from 'react-icons/fa'; // Importing icons from react-icons
import Navbar from '../components/Navbar'; // Importing Navbar

const HomePage = () => {
  return (
    <div>
      <Navbar /> {/* Add the Navbar to the top of the page */}
      
      {/* Hero Section */}
      <div className="hero-section bg-gray-100 min-h-screen flex items-center justify-center text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-gray-800">Welcome to MyWebsite</h1>
          <p className="text-lg text-gray-600">Sign up or sign in to access exclusive features</p>
          <div className="space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
              // onClick={() => window.location.href = '/signin'}
            >
              <FaSignInAlt className="mr-2" /> {/* Sign In icon */}
              Sign In
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center"
              // onClick={() => window.location.href = '/signup'}
            >
              <FaUser className="mr-2" /> {/* Sign Up icon */}
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
