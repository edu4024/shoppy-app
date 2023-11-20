import NextAuth from 'next-auth';
import { cookies } from 'next/headers';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import * as Api from '@/app/src/api';
import { LoginFormDto } from '@/app/src/dto/auth.dto';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const tokenFromCookies = cookies().get('_token')?.value;
        if (tokenFromCookies) return tokenFromCookies;
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const { token } = await Api.auth.login(<LoginFormDto>{ email, password });
          if (token) {
            cookies().set('_token', token);
            return true;
          }
        }

        return null;
      }
    })
  ]
});
