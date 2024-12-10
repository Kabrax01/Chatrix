import {
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import EditCurrentUser from "./EditCurrentUser";
import ChatContextProvider from "../../../contexts/chatContext/ChatContext";
import ListContextProvider from "../../../contexts/listContext/ListContext";
import userEvent from "@testing-library/user-event";

describe("EditCurrentUser", () => {
    const renderComponent = () => {
        render(
            <ListContextProvider>
                <ChatContextProvider>
                    <EditCurrentUser />
                </ChatContextProvider>
            </ListContextProvider>
        );

        return {
            fileInput: screen.getByTestId("fileInput"),
            nameInput: screen.getByRole("textbox", { name: /name/i }),
            submitButton: screen.getByRole("button", { name: /submit/i }),
            user: userEvent.setup({ applyAccept: false }),
        };
    };

    it("should render all elements", () => {
        const { fileInput, nameInput, submitButton } = renderComponent();

        expect(fileInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("should show upload indicator when form is submitted", async () => {
        const { nameInput, submitButton, user } = renderComponent();

        await user.type(nameInput, "John Doe");
        await user.click(submitButton);
        const uploadIndicator = screen.queryByText(/uploading/i);

        expect(uploadIndicator).toBeInTheDocument();
    });

    it("should show an success message when user name change is successful", async () => {
        const { nameInput, submitButton, user } = renderComponent();

        await user.type(nameInput, "John Doe");
        await user.click(submitButton);
        await waitForElementToBeRemoved(screen.queryByText(/uploading/i));
        const successMessage = screen.getByText(/upload successful/i);

        expect(successMessage).toBeInTheDocument();
        expect(submitButton).not.toBeDisabled();
    });

    it("should disable submit button upon submission", async () => {
        const { nameInput, submitButton, user } = renderComponent();

        await user.type(nameInput, "John Doe");
        await user.click(submitButton);

        expect(submitButton).toBeDisabled();
    });
});
