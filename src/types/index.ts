export type TUser = {
  uuid: string;
  username: string;
  email: string;
  address?: string;
};


export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = {
  username: string;
  email: string;
  password: string;
};


