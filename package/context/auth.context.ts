import React from "react";

export type AuthContextType = {
  signIn: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);
