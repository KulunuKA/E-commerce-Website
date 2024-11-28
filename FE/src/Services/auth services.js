import { store } from "../Store/store";

export const AuthService = {
  getTokens: () => {
    const accessToken = store.getState().user.user.token;
    console.log(accessToken)
    return {accessToken};
  },
  setTokens: (tokens) => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  },
  logout: () => {},
};