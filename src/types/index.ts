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


