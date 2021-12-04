import { Deferred } from "../view/Deferred";
import { authStore } from "../stores/authStore";


export const login = (
  username: string,
  password: string,
  remember: boolean
): Promise<void> => {
  const deferred = new Deferred<void>();
  // save data to the store
  authStore.useStore.setState({ username, password, remember });
  authStore.useStore.setState({ userAuthorized: true });
  //const username = "PrametUser";
  //const password = "pramet";
  return deferred.promise;
};


export const logout = (): void => {
  authStore.useStore.setState({ userAuthorized: false }, true);
};

