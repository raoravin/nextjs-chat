// app/signin/page.js

"use client"

import { useState } from 'react'; // Import useState to manage state in the component
import { useRouter } from 'next/router'; // Import useRouter for navigation after successful sign-in
import useAuth from '../hooks/useAuth'; // Import custom authentication hook to manage sign-in
import AuthForm from '../components/AuthForm'; // Import the reusable AuthForm component

const SignIn = () => {
  // Destructure sign-in functions from the custom authentication hook
  const { signInWithEmailPassword, signInWithGoogle } = useAuth(); 

  // State to store error messages and loading state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Router hook for navigating after successful sign-in
  const router = useRouter(); 

  // Function to handle sign-in with email and password
  const handleSignIn = async (email, password) => {
    setError(''); // Clear any previous error messages
    setLoading(true); // Set loading state to true during the API request

    // Validate the email format using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.'); // Show error message for invalid email
      setLoading(false); // Reset loading state
      return; // Stop further execution
    }

    try {
      // Attempt to sign in the user with email and password
      await signInWithEmailPassword(email, password);
      alert('Sign in successful!'); // Show a success alert
      setLoading(false); // Reset loading state

      // Redirect the user to the dashboard after successful sign-in
      router.push('/dashboard'); 
    } catch (error) {
      // Log the error and set an error message to be displayed
      console.error('Error during sign-in:', error.message);
      setError('Error signing in. Please try again.'); // Set user-friendly error message
      setLoading(false); // Reset loading state
    }
  };

  return (
    // Flex container to center the form in the middle of the screen
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* Reusable AuthForm component to handle sign-in form */}
      <AuthForm
        title="Sign In" // Title for the sign-in form
        onSubmit={handleSignIn} // Pass the handleSignIn function to the AuthForm's onSubmit prop
        errorMessage={error} // Pass error message to the form if any
        buttonText={loading ? 'Signing In...' : 'Sign In'} // Show loading text when signing in, otherwise 'Sign In'
        loadingText={loading ? 'Signing In...' : 'Sign In'} // Same as buttonText, used to show during loading
        signInWithGoogle={signInWithGoogle} // Pass the Google sign-in function as a prop
      />
    </div>
  );
};

export default SignIn; // Export SignIn component for use in the app
