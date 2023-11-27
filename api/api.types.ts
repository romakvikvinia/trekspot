/**
 * configs
 */
export enum SocialProvidersEnum {
  Facebook = "Facebook",
  Google = "Google",
  Apple = "Apple",
}

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

export type AuthSocialLogInInput = Pick<TokenType, "token"> & {
  provider: SocialProvidersEnum;
};
export type AuthSocialLogInResponseType = {
  data: {
    socialLogin: TokenType;
  };
};
