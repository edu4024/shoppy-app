export interface LoginFormDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

export type SingInFormDto = LoginFormDto & {
  firstName: string
  lastName: string
};
export type RegisterResponseDto = LoginResponseDto;
