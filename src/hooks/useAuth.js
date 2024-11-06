import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods


const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const signUpWithEmailPassword = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await userCredential.user.updateProfile({ displayName: `${firstName} ${lastName}` });
      // Add user data to Firestore database

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      throw error;
    }
  };

  return { user, signUpWithEmailPassword, loginWithEmailPassword, signInWithGoogle };
};

export default useAuth;
