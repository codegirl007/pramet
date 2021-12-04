import create from "zustand";

export type AuthStoreType = {
  username: string;
  password: string;
  remember: boolean;
  //token?: AuthorizationToken;
  userAuthorized: boolean;
  //tokenISODate?: string;
};

export const useStore = create<AuthStoreType>(() => ({
  username: "",
  password: "",
  remember: true,
  userAuthorized: false,
}));

export const authStore = {
  useStore,
};