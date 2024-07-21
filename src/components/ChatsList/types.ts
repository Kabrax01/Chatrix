export interface Chat {
    receiverId: string;
    chatId: string;
    lastMessage: string;
    updatedAt: number;
}

export type ChatsType = {
    [key: number]: Chat;
    user: User;
};

export interface ListContextProps {
    isOpenSearch: boolean;
    setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface User {
    email: string;
    id: string;
    userName: string;
    avatar?: string;
}
