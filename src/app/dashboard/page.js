// src/app/dashboard/page.js

"use client"

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';  // Firebase imports
import { useRouter } from 'next/navigation'; // Next.js router import
import { auth } from '@/firebase/firebaseConfig';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  console.log(user);
  
  const router = useRouter();  // Initialize the Next.js router

  // Initialize Firebase Authentication

  useEffect(() => {
    // Check for current user and set user state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // If user is logged in, set user state
      } else {
        setUser(null); // If no user is logged in, set user state to null
        router.push('/signin');  // Redirect to sign-in page if no user
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md text-center">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.displayName || 'User'}</h1>
            <p className="text-sm">Email: {user.email}</p>
            <p className="text-sm">UID: {user.uid}</p>
          </div>
        ) : (
          // Optionally, you can show a loading state while waiting for authentication
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
