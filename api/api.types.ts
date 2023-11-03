export type TokenType = {
  token: string;
  expire: number;
};

export type AuthResponseType = {
  data: {
    login: TokenType;
  };
};

export type AuthLoginType = {
  email: string;
  password: string;
};
