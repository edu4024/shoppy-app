'use server';
import { cookies } from 'next/headers';
import { LoginFormDto, SingInFormDto } from '@/app/src/dto/auth.dto';
import { signIn, signOut } from '@/auth';

export async function login(formData: LoginFormDto) {
  await signIn('credentials', <SingInFormDto>formData);
}

export async function logOut() {
  cookies().delete('_token');
  await signOut({ redirectTo: '/login' });
}
