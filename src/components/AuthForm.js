// components/AuthForm.js

import { useState } from 'react';

const AuthForm = ({ title, onSubmit, errorMessage, buttonText, loadingText, signInWithGoogle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password); // Call the onSubmit function passed from parent (signUp or signIn)
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">{title}</h2>

      <form onSubmit={handleSubmit}>
        {/* Email Input Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input Field */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-2 right-4 text-gray-500"
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Display error message if any */}
        {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md"
        >
          {loadingText}
        </button>
      </form>

      {/* Google Sign-In Button */}
      {signInWithGoogle && (
        <div className="my-4 text-center">
          <p className="text-sm text-gray-600">Or sign in with</p>
          <button
            onClick={signInWithGoogle}
            className="w-full mt-3 py-2 px-4 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600"
          >
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
