// src/hooks/useAuth.js
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const signUpWithEmailPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return { user, loading, error, signUpWithEmailPassword, loginWithEmailPassword, logout };
};

export default useAuth;
