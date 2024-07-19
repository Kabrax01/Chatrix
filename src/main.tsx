import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatContextProvider } from "./contexts/chatContext/ChatContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChatContextProvider>
            <App />
        </ChatContextProvider>
    </React.StrictMode>
);
