import React from "react";
interface AuthContextType {
  isLoggedIn:boolean;
  logoutHandler?: () => void
}
const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
}
export const AuthContext = React.createContext(defaultAuthContext);

export interface EmailState {
  enteredEmail: string;
  emailIsValid: boolean;
}
export interface PasswordState {
  enteredPassword: string;
  passwordIsValid: boolean;
}
export interface Action {
  type: string;
  value?: string;
}

export const passwordReducer = (state: PasswordState, action: Action) => {
  if (action.type === "USER_INPUT") {
    return {
      enteredPassword: action.value!,
      passwordIsValid: action.value!.length > 6,
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      enteredPassword: state.enteredPassword,
      passwordIsValid: state.enteredPassword!.length > 6,
    };
  }
  return { enteredPassword: "", passwordIsValid: false };
};
export const emailReducer = (state: EmailState, action: Action) => {
  if (action.type === "USER_INPUT") {
    return {
      enteredEmail: action.value!,
      emailIsValid: action.value!.includes("@"),
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      enteredEmail: state.enteredEmail,
      emailIsValid: state.enteredEmail!.includes("@"),
    };
  }
  return { enteredEmail: "", emailIsValid: false };
};
