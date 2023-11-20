export interface LoginFormDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

export type SingInFormDto = LoginFormDto & { fullName: string };
export type RegisterResponseDto = LoginResponseDto;
