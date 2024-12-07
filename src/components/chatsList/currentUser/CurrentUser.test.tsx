import { render, screen } from "@testing-library/react";
import CurrentUser from "./CurrentUser";
import userEvent from "@testing-library/user-event";

const setIsOpenCurrentUserEdit = vi.fn();

const { useChatContext, useListContext } = vi.hoisted(() => {
    return {
        useChatContext: vi.fn(),
        useListContext: vi.fn(() => ({
            setIsOpenCurrentUserEdit,
        })),
    };
});

vi.mock("../../../contexts/chatContext/useChatContext", () => {
    return {
        default: useChatContext,
    };
});

vi.mock("../../../contexts/listContext/useListContext", () => {
    return {
        default: useListContext,
    };
});

describe("CurrentUser", () => {
    const renderComponent = () => {
        render(<CurrentUser />);
    };

    it("should render user image when avatar string is provided", () => {
        useChatContext.mockReturnValue({
            state: { user: { avatar: "/john.png" } },
        });
        renderComponent();

        const picture = screen.getByAltText("Current user picture");

        expect(picture).toHaveAttribute("src", "/john.png");
    });

    it("should render default image when avatar string is not provided", () => {
        useChatContext.mockReturnValue({
            state: { user: {} },
        });
        renderComponent();

        const picture = screen.getByAltText("Current user picture");

        expect(picture).toHaveAttribute("src", "./avatar.png");
    });

    it("should render a user name", () => {
        useChatContext.mockReturnValue({
            state: { user: { userName: "John Doe" } },
        });
        renderComponent();

        const name = screen.getByRole("paragraph");

        expect(name).toHaveTextContent("John Doe");
    });

    it("should show the settings when the button is clicked", async () => {
        renderComponent();
        const button = screen.getByRole("button");
        const user = userEvent.setup();
        await user.click(button);

        expect(setIsOpenCurrentUserEdit).toHaveBeenCalledTimes(1);
    });
});
