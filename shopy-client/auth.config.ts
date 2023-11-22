import type { NextAuthConfig } from 'next-auth';
import { cookies } from 'next/headers';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const token = cookies().get('_token')?.value;
      const isLoggedIn = !!auth && token;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn;
         // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard/marketplace', nextUrl));
      }
      return true;
    }
  }
} satisfies NextAuthConfig;
