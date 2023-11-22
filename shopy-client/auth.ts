import NextAuth from 'next-auth';
import { cookies } from 'next/headers';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import * as Api from '@/app/src/api';
import { LoginFormDto, SingInFormDto } from '@/app/src/dto/auth.dto';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            firstName: z.string(),
            lastName: z.string()
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const getToken = async ({ email, password, firstName, lastName }) => {
            if (email && password && firstName && lastName) {
              return Api.auth.signUp(<SingInFormDto>{email, password, firstName, lastName});
            }
            if (email && password) {
              return Api.auth.login(<LoginFormDto>{ email, password });
            }
            return null;
          };
          const { token } = await getToken( parsedCredentials.data);
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
