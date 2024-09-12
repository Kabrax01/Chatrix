import { ReactNode } from "react";

export interface ListProviderProps {
    children: ReactNode;
}

export interface ListContextTypes {
    isOpenSearch: boolean;
    setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenCurrentUserEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenCurrentUserEdit: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
