import { render, screen } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import { ChatContextProvider } from "../../contexts/chatContext/ChatContext";
import userEvent from "@testing-library/user-event";

describe("RegisterForm", () => {
    const renderComponent = () => {
        render(<RegisterForm />, { wrapper: ChatContextProvider });

        const user = userEvent.setup();

        return {
            nameInput: screen.getByPlaceholderText(/name/i),
            emailInput: screen.getByPlaceholderText(/email/i),
            passwordInput: screen.getByTestId("password"),
            confirmPasswordInput: screen.getByPlaceholderText(/confirm/i),
            singInButton: screen.getByRole("button", { name: /sign in/i }),
            user,
        };
    };

    it("should render all inputs", () => {
        const { nameInput, emailInput, passwordInput, confirmPasswordInput } =
            renderComponent();

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
    });

    it.each([
        {
            field: "name",
            errorMessage: /filled/i,
        },
        {
            field: "email",
            errorMessage: /filled/i,
        },
        {
            field: "password",
            errorMessage: /filled/i,
        },
        {
            field: "confirm password",
            errorMessage: /filled/i,
        },
    ])(
        "should show an error when $field input is empty",
        async ({ errorMessage }) => {
            const { user, singInButton } = renderComponent();

            await user.click(singInButton);
            const error = await screen.findByRole("alert");

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(errorMessage);
        }
    );
});
