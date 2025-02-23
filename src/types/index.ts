export type TUser = {
  uuid: string;
  username: string;
  email: string;
  address?: string;
  maxScore: number;
  maxTile: number;
  maxMoves: number;
  rows: number;
  cols: number;
  hammer: number;
  bolt: number;
  bomb: number;
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

export type TTileImg = {
  sm: string;
  lg: string;
  title: string;
  description: string;
  pl: string;
  pd: string;
}
export type TTheme = {
  uuid: string;
  title: string;
  description: string;
  2:TTileImg;
  4:TTileImg;
  8:TTileImg;
  16: TTileImg;
  32: TTileImg;
  64: TTileImg;
  128: TTileImg;
  256: TTileImg;
  512: TTileImg;
  1024: TTileImg;
  2048: TTileImg;
  4096: TTileImg;
  8192: TTileImg;
  owned: boolean;
};

export type TBoltStatus = {
  enabled: boolean;
  currentStart: number;
}

export type TOption = {
  label: React.ReactNode;
  value: string;
}