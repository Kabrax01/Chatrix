export interface Chat {
    id: string;
    message: string;
    timestamp: Date;
}

export type ChatsType = { chats: Chat[] };

export interface ListContextProps {
    isOpenSearch: boolean;
    setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
