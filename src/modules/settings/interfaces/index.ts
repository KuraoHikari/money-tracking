export interface IUpdateProfileForm {
  displayName: string;
  email: string;
}

export interface IUpdatePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
