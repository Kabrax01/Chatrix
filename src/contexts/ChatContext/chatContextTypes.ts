import { ReactNode } from "react";

export type ChatContextProps = {
    children: ReactNode;
};

export type StateTypes = {
    loading: boolean;
    registration: boolean;
    uid: string;
    user: null | UserObject;
    isLoggedIn: boolean;
};

export type UserObject = {
    email: string;
    uid: string;
    userName: string;
    avatar: string;
};

export type CounterAction =
    | { type: "loading" }
    | { type: "loadingEnd" }
    | { type: "registered"; payload: boolean }
    | { type: "loggedIn"; payload: string }
    | { type: "loggedOut" }
    | {
          type: "userDataReceived";
          payload: UserObject;
      }
    | { type: "userAvatarChange"; payload: string }
    | { type: "userNameChange"; payload: string };
