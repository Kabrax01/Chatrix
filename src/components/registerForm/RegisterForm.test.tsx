import { render, screen, waitFor } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import { ChatContextProvider } from "../../contexts/chatContext/ChatContext";
import userEvent from "@testing-library/user-event";

describe("RegisterForm", () => {
    const renderComponent = () => {
        render(<RegisterForm />, { wrapper: ChatContextProvider });

        const user = userEvent.setup();

        const nameInput = screen.getByPlaceholderText(/name/i);
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByTestId("password");
        const confirmPasswordInput = screen.getByPlaceholderText(/confirm/i);
        const singInButton = screen.getByRole("button", { name: /sign in/i });

        const fillForm = async () => {
            await user.type(nameInput, "Arni");
            await user.type(emailInput, "Arni@gmail.com");
            await user.type(passwordInput, "12345678");
            await user.type(confirmPasswordInput, "12345678");
        };

        return {
            nameInput,
            emailInput,
            passwordInput,
            confirmPasswordInput,
            singInButton,
            user,
            fillForm,
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

    it("should disable the submit button upon submission", async () => {
        const { singInButton, user, fillForm } = renderComponent();

        await fillForm();
        await user.click(singInButton);

        expect(singInButton).toBeDisabled();
    });

    it("should enable the submit button after successful submission", async () => {
        const { singInButton, user, fillForm } = renderComponent();

        await fillForm();
        await user.click(singInButton);

        await waitFor(() => {
            expect(screen.getByText(/successful/i)).toBeInTheDocument();
        });
        expect(singInButton).toBeEnabled();
    });
});
