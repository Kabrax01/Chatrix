import { render, screen } from "@testing-library/react";
import AddUser from "./AddUser";
import userEvent from "@testing-library/user-event";

const { useListContext, useChatContext } = vi.hoisted(() => {
    return {
        useListContext: vi.fn(() => ({
            setIsOpenSearch: vi.fn(),
        })),
        useChatContext: vi.fn(() => ({
            state: {
                user: {
                    uid: "1234",
                },
            },
        })),
    };
});

vi.mock("../../../contexts/listContext/useListContext", () => {
    return {
        default: useListContext,
    };
});

vi.mock("../../../contexts/chatContext/useChatContext.tsx", () => {
    return {
        default: useChatContext,
    };
});

describe("AddUser", () => {
    const renderComponent = () => {
        render(<AddUser />);

        return {
            heading: screen.getByText("Search user"),
            closeButton: screen.getByLabelText(/close/i),
            nameInput: screen.getByRole("textbox"),
            searchButton: screen.getByText("Search"),
            form: screen.getByRole("form"),
            user: userEvent.setup(),
        };
    };

    it("should render component with heading, form, and close button", () => {
        const { heading, closeButton, nameInput, searchButton } =
            renderComponent();

        expect(heading).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it("should show correct message when input is empty upon submission", async () => {
        const { user, searchButton } = renderComponent();
        await user.click(searchButton);

        const message = await screen.findByText("No users found");

        expect(message).toBeInTheDocument();
    });

    it("should fire callback when user name is provided", async () => {
        const handleSearchUser = vi.fn();
        const { user, form, nameInput, searchButton } = renderComponent();
        form.onsubmit = handleSearchUser;
        await user.type(nameInput, "John");
        await user.click(searchButton);

        expect(nameInput).toHaveValue("John");
        expect(handleSearchUser).toHaveBeenCalledTimes(1);
    });

    it(" should close search user window if the close button is clicked", async () => {
        const setIsOpenSearch = vi.fn();
        const { closeButton } = renderComponent();
        closeButton.onclick = setIsOpenSearch;
        await userEvent.click(closeButton);

        expect(setIsOpenSearch).toHaveBeenCalledOnce();
    });
});
