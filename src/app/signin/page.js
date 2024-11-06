"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase imports
import useAuth from '../../hooks/useAuth'; // Custom hook to handle authentication
import AuthForm from '../../components/AuthForm'; // Reusable form component

const SignIn = () => {
  const { loginWithEmailPassword, signInWithGoogle } = useAuth(); // Use the custom hook for login and Google login
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // To track if authentication is checked
  const router = useRouter();

  // Firebase authentication setup
  const auth = getAuth();

  // Check user authentication status when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, redirect to dashboard
        router.push('/dashboard');
      }
      setIsAuthChecked(true); // Set to true once auth check is done
    });

    return () => unsubscribe();
  }, [auth, router]);

  // Don't render anything until authentication check is completed
  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <p>Loading...</p> {/* Show a loading message */}
      </div>
    );
  }

  // Handle form submission
  const onSubmit = async (email, password) => {
    setError('');
    setLoading(true);

    try {
      const userCredential = await loginWithEmailPassword(email, password);
      const user = userCredential?.user;
      if (user) {
        router.push('/dashboard');
      }
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
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      if (user) {
        router.push('/dashboard');
      }
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
          onSubmit={onSubmit}
          errorMessage={error}
          buttonText="Sign In"
          loadingText={loading ? 'Signing In...' : ''}
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
