import React, { ReactElement, useEffect } from "react";
import shallow from "zustand/shallow";
import { authStore } from "../stores/authStore";
import { LoginScreen } from "./screens/LoginScreen";

type Props = {
  children: ReactElement;
};

export const Auth = (props: Props): ReactElement => {
  const userAuthorized = authStore.useStore(
    (store) => store.userAuthorized,
    shallow
  );

  return !userAuthorized ? <LoginScreen /> : props.children;
};
