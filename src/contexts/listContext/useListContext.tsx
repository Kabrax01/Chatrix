import { useContext } from "react";
import { ListContext } from "./ListContext";

const useListContext = () => {
    const context = useContext(ListContext);

    if (!context)
        throw new Error("Context was used outside of ListContext.Provider");

    return context;
};

export default useListContext;
