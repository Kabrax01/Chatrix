import { render, screen } from "@testing-library/react";
import CurrentUser from "./CurrentUser";
import { ListContextProvider } from "../../../contexts/listContext/ListContext";

const { useChatContext } = vi.hoisted(() => {
    return {
        useChatContext: vi.fn(),
    };
});

vi.mock("../../../contexts/chatContext/useChatContext", () => {
    return {
        default: useChatContext,
    };
});

describe("CurrentUser", () => {
    const renderComponent = () => {
        render(
            <ListContextProvider>
                <CurrentUser />
            </ListContextProvider>
        );
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
});
