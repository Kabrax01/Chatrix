interface Chat {
    chatId: string;
    lastMessage: string;
    receiverId: string;
    updatedAt: number;
    hasBeenOpened: boolean;
}

export type ChatsType = {
    [key: number]: Chat;
    user: User;
};

export interface User {
    email: string;
    id: string;
    userName: string;
    avatar?: string;
}
