// src/app/signin/page.js

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth'; // Custom hook to handle authentication
import AuthForm from '../../components/AuthForm'; // Reusable form component

const SignIn = () => {
  const { loginWithEmailPassword, signInWithGoogle } = useAuth(); // Use the custom hook for login and Google login
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSignIn = async (email, password) => {
    setError('');
    setLoading(true);

    try {
      // Attempt to log in with Firebase Authentication
      await loginWithEmailPassword(email, password);
      setLoading(false);

      // Redirect to dashboard if successful
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      setLoading(false);
      router.push('/dashboard'); // Redirect to dashboard upon success
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <AuthForm
          title="Sign In"
          onSubmit={handleSignIn}
          errorMessage={error}
          buttonText={loading ? 'Signing In...' : 'Sign In'}
          loadingText="Signing In..."
        />

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white p-3 rounded-md mt-4 flex items-center justify-center"
        >
          <span className="mr-2">Sign in with Google</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" className="w-5 h-5" />
        </button>

        {/* Navigate to the sign-up page */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
