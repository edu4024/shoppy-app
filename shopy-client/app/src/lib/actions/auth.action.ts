'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as Api from '@/app/src/api';
import { LoginFormDto, SingInFormDto } from '@/app/src/dto/auth.dto';
import { signIn, signOut } from '@/auth';

export async function login(formData: LoginFormDto) {
  const { email, password } = formData;
  await signIn('credentials', { email, password });
}

export async function signUp(formData: SingInFormDto) {
  const { token } = await Api.auth.signUp(<SingInFormDto>formData);
  cookies().set('_token', token);
  redirect('/dashboard/marketplace');
}

export async function logOut() {
  await signOut();
  cookies().delete('_token');
  redirect('/login');
}
