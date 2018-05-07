export interface IUser{
  username: string;
  password: string;
}

export interface ISignupUser extends IUser{
  email: string;
}