'use server';
import axios from '@/app/src/lib/axios';
import {
  LoginFormDto, LoginResponseDto, RegisterResponseDto,
  SingInFormDto
} from '@/app/src/dto/auth.dto';

export const login = async (
  values: LoginFormDto
): Promise<LoginResponseDto> => {
  try {
    return (await axios.post('/auth/login', values)).data;
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (
  values: SingInFormDto
): Promise<RegisterResponseDto> => {
  try {
    return (await axios.post('/auth/signin', values)).data;
  } catch (err) {
    console.log(err);
  }
};
