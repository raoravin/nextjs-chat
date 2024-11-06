// src/middleware.js

import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';

initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

export async function middleware(req) {
    const token = req.cookies.get('token');
  
    console.log('Token from cookie:', token); // Add logging here
  
    // Define protected routes
    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  
    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
      if (!token) {
        console.log('No token found, redirecting to sign-in');
        return NextResponse.redirect(new URL('/signin', req.url));
      }
  
      try {
        await getAuth().verifyIdToken(token);
        return NextResponse.next();
      } catch (error) {
        console.error('Invalid token:', error);
        return NextResponse.redirect(new URL('/signin', req.url));
      }
    }
  
    return NextResponse.next();
  }
  

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};
