export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
