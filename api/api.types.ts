export type TokenType = {
  token: string;
  expire: number;
};

export type AuthLoginResponseType = {
  data: {
    login: TokenType;
  };
};

export type AuthLoginType = {
  email: string;
  password: string;
};

export type AuthLogUpType = AuthLoginType & {
  firstName: string;
  lastName: string;
};

export type AuthSignUpResponseType = {
  data: {
    signUp: Omit<AuthLogUpType, "password">;
  };
};
