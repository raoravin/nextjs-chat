import { getAuth } from 'firebase/auth';
import { adminAuth } from '@/src/firebase/firebaseAdmin';

export default async function handler(req, res) {
  const auth = getAuth();
  const { token } = req.body; // Token from the client after sign-in

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`
    );
    return res.status(200).json({ message: 'Authenticated' });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
