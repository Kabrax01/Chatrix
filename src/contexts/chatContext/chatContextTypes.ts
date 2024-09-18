import { ReactNode } from "react";

export type ChatContextProps = {
    children: ReactNode;
};

export interface StateTypes {
    loading: boolean;
    registration: boolean;
    uid: string;
    user: null | UserObject;
    isLoggedIn: boolean;
    activeChatUser: null | ActiveChatUserObject;
    activeChat: null | Chat;
    chats: null | Chat[];
    filteredChats: null | Chat[];
}

export interface UserObject {
    email: string;
    uid: string;
    userName: string;
    avatar?: string;
}

export interface ActiveChatUserObject {
    email: string;
    id: string;
    userName: string;
    avatar?: string;
}
export interface Chat {
    chatId: string;
    lastMessage: string;
    receiverId: string;
    updatedAt: number;
    hasBeenOpened: boolean;
    user: User;
}

export interface User {
    email: string;
    id: string;
    userName: string;
    avatar?: string;
}

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
    | { type: "userNameChange"; payload: string }
    | {
          type: "activeChatSelect";
          payload: { activeUser: ActiveChatUserObject; activeChat: Chat };
      }
    | { type: "userChatsChange"; payload: Chat[] }
    | { type: "filterChats"; payload: Chat[] | null };
