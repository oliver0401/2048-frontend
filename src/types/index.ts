export type TUser = {
  uuid: string;
  username: string;
  email: string;
  address?: string;
  maxScore: number;
  maxTile: number;
  minMoves: number;
  rows: number;
  cols: number;
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


export type THandleStoreSeed = {
  seed: string;
  confirm: boolean;
  email: string;
  password: string;
};

export type TSeed = {
  seed: string;
  confirm: boolean;
};

export type TTheme = {
  uuid: string;
  title: string;
  description: string;
  2:string;
  4:string;
  8:string;
  16: string;
  32: string;
  64: string;
  128: string;
  256: string;
  512: string;
  1024: string;
  2048: string;
  4096: string;
  8192: string;
  owned: boolean;
};

export type TBoltStatus = {
  enabled: boolean;
  currentStart: number;
}