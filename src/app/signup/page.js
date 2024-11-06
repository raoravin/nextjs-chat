"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import AuthForm from '../../components/AuthForm';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const { signUpWithEmailPassword, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (email, password, firstName, lastName) => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await signUpWithEmailPassword(email, password, firstName, lastName);
      if (userCredential.user) {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Error signing up. Please try again.');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <AuthForm
          title="Sign Up"
          onSubmit={onSubmit}
          errorMessage={error}
          buttonText={loading ? 'Signing Up...' : 'Sign Up'}
          loadingText={loading ? 'Signing Up...' : ''}
        />
      </div>
    </div>
  );
};

export default SignUp;
