import { render, screen } from "@testing-library/react";
import SearchedUser from "./SearchedUser";
import ChatContextProvider from "../../../../contexts/chatContext/ChatContext";
import ListContextProvider from "../../../../contexts/listContext/ListContext";
import userEvent from "@testing-library/user-event";

describe("SearchedUser", () => {
    const user = {
        id: "1234",
        userName: "John Doe",
        email: "john@gmail.com",
        avatar: "/john.jpg",
    };

    const renderComponent = () => {
        render(
            <ChatContextProvider>
                <ListContextProvider>
                    <SearchedUser user={user} />
                </ListContextProvider>
            </ChatContextProvider>
        );

        return {
            userPicture: screen.getByRole("img"),
            userName: screen.getByText(user.userName),
            userEmail: screen.getByText(user.email),
            button: screen.getByRole("button"),
        };
    };

    it("should render image, name, email with provided data", () => {
        const { userName, userEmail, userPicture, button } = renderComponent();

        expect(userName).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(userPicture).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("should display data from provided user object", () => {
        const { userName, userEmail, userPicture } = renderComponent();

        expect(userName).toHaveTextContent(user.userName);
        expect(userEmail).toHaveTextContent(user.email);
        expect(userPicture).toHaveAttribute("src", `${user.avatar}`);
    });

    it("should add user to list when button is clicked", async () => {
        const handleAddUser = vi.fn();
        const { button } = renderComponent();
        button.onclick = handleAddUser;

        const user = userEvent.setup();
        await user.click(button);

        expect(handleAddUser).toHaveBeenCalledOnce();
    });
});
