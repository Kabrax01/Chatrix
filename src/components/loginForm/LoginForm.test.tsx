import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { ChatContextProvider } from "../../contexts/chatContext/ChatContext";
import userEvent from "@testing-library/user-event";
import { should } from "vitest";

describe("LoginForm", () => {
    const renderComponent = () => {
        render(<LoginForm />, { wrapper: ChatContextProvider });

        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const logInButton = screen.getByRole("button", { name: /log in/i });

        const fillForm = async () => {
            await user.type(emailInput, "Arni@gmail.com");
            await user.type(passwordInput, "12345678");
        };

        return {
            emailInput,
            passwordInput,
            logInButton,
            user,
            fillForm,
        };
    };

    it("should render all inputs", () => {
        const { emailInput, passwordInput } = renderComponent();

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it.each([
        { field: "email", errorMessage: /required/i },
        { field: "password", errorMessage: /required/i },
    ])(
        "should show an error message when $field input is empty",
        async ({ errorMessage }) => {
            const { user, logInButton } = renderComponent();

            await user.click(logInButton);
            const error = await screen.findByRole("alert");

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(errorMessage);
        }
    );

    it("should disable the submit button upon submission", async () => {
        const { logInButton, user, fillForm } = renderComponent();

        await fillForm();
        await user.click(logInButton);

        expect(logInButton).toBeDisabled();
    });

    it("should enable the submit button after successful submission", async () => {
        const { logInButton, user, fillForm } = renderComponent();

        await fillForm();
        await user.click(logInButton);

        await waitFor(() => {
            expect(screen.getByText(/successful/i)).toBeInTheDocument();
        });
        expect(logInButton).toBeEnabled();
    });
});
