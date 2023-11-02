export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export type AuthStateType = {
  isLoading: boolean;
  expires_in: string | null;
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  user: object | null;
};

type SignInType = {
  type: typeof SIGN_IN;
  payload: Partial<AuthStateType>;
};
type SignOutType = {
  type: typeof SIGN_OUT;
};
type RestoreTokenType = {
  type: typeof RESTORE_TOKEN;
  payload: Partial<AuthStateType>;
};

export type ActionType = SignInType | SignOutType | RestoreTokenType;

export const defaultState = (): AuthStateType => ({
  isLoading: false,
  expires_in: null,
  token: null,
  refresh_token: null,
  isAuthenticated: false,
  user: null,
});

export function authReducer(
  state: AuthStateType,
  action: ActionType
): AuthStateType {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        token: action.payload.token!,
        isAuthenticated: true,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token!,
        isAuthenticated: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
      };
  }
}
