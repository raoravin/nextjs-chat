// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase'; // Firebase authentication instance
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Custom hook to manage authentication state and provide signup/login/logout methods
 * @returns {Object} - Contains user object, signup, login, signOutUser functions
 */
const useAuth = () => {
  const [user, setUser] = useState(null); // State to store user data

  // Listen for authentication state changes and update user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user data if authenticated, null if not
    });

    // Cleanup listener when component unmounts or when user changes
    return () => unsubscribe();
  }, []);

  /**
   * Handles Google Sign-In using Firebase Authentication
   * @returns {void}
   */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Google Auth provider instance
    try {
      await signInWithPopup(auth, provider); // Sign in with Google
    } catch (error) {
      console.error("Error during Google sign-in:", error.message); // Error handling
    }
  };

  /**
   * Handles sign-up with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {void}
   */
  const signUpWithEmailPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Create user
    } catch (error) {
      console.error("Error during signup:", error.message); // Error handling
    }
  };

  /**
   * Handles login with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {void}
   */
  const loginWithEmailPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
    } catch (error) {
      console.error("Error during login:", error.message); // Error handling
    }
  };

  /**
   * Handles sign-out action
   * @returns {void}
   */
  const signOutUser = async () => {
    try {
      await signOut(auth); // Sign the user out
    } catch (error) {
      console.error("Error during sign-out:", error.message); // Error handling
    }
  };

  return { user, signInWithGoogle, signUpWithEmailPassword, loginWithEmailPassword, signOutUser }; // Expose authentication methods and user data
};

export default useAuth;
