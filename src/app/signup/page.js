// app/signup/page.js

"use client" // Ensures this component runs on the client-side

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation after successful sign-up
import useAuth from '../../hooks/useAuth'; // Custom authentication hook for sign-up
import AuthForm from '../../components/AuthForm'; // Import the reusable AuthForm component

const SignUp = () => {
  // Destructure authentication functions from the custom hook
  const { signUpWithEmailPassword, signInWithGoogle } = useAuth(); 

  // State for managing error messages and loading state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Router hook to navigate to other pages after successful sign-up
  const router = useRouter();

  // Handle email and password sign-up process
  const handleSignUp = async (email, password) => {
    setError(''); // Reset any previous errors
    setLoading(true); // Set loading state to true during API request

    // Validate email format using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.'); // Show error message for invalid email
      setLoading(false); // Reset loading state
      return; // Stop further execution
    }

    // Check if the password meets the minimum length requirement
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.'); // Show error message for weak password
      setLoading(false); // Reset loading state
      return; // Stop further execution
    }

    try {
      // Call the sign-up function from the custom hook
      await signUpWithEmailPassword(email, password);
      alert('Sign up successful!'); // Show success message
      setLoading(false); // Reset loading state

      // Navigate to the dashboard after successful sign-up
      router.push('/dashboard'); 
    } catch (error) {
      // Log the error and show a user-friendly error message
      console.error('Error during sign-up:', error.message);
      setError('Error signing up. Please try again.'); // Display error to user
      setLoading(false); // Reset loading state
    }
  };

  return (
    // Flex container for centering the form on the screen
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* AuthForm is the reusable form component */}
      <AuthForm
        title="Sign Up" // Form title for the sign-up page
        onSubmit={handleSignUp} // Pass handleSignUp as the onSubmit handler
        errorMessage={error} // Pass any error messages to the AuthForm
        buttonText={loading ? 'Signing Up...' : 'Sign Up'} // Change button text based on loading state
        loadingText={loading ? 'Signing Up...' : 'Sign Up'} // Change button text based on loading state
        signInWithGoogle={signInWithGoogle} // Pass the Google sign-in function as a prop
      />
    </div>
  );
};

export default SignUp; // Export the SignUp component for use in the app
