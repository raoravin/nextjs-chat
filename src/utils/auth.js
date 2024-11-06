// src/utils/auth.js

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

export async function signInUser(email, password) {
  const auth = getAuth();
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    await axios.post('/api/auth/signin', { token });
    return { success: true };
  } catch (error) {
    console.error('Error during sign-in:', error);
    return { success: false, error: error.message };
  }
}
