import { render, screen } from "@testing-library/react";
import SwitchForm from "./SwitchForm";
import { FormTypes } from "@/App";
import userEvent from "@testing-library/user-event";

describe("SwitchForm", () => {
    it.each([{ type: "Register" }, { type: "Login" }])(
        "should render buttons with text $type",
        ({ type }) => {
            render(
                <SwitchForm
                    setFormType={vi.fn()}
                    formType={type as FormTypes}
                />
            );

            expect(
                screen.getByRole("button", { name: `${type}` })
            ).toBeInTheDocument();
        }
    );

    it.each([{ type: "Register" }, { type: "Login" }])(
        "should call setFormType with $type when the corresponding button is clicked",
        async ({ type }) => {
            const setFormType = vi.fn();

            render(
                <SwitchForm
                    setFormType={setFormType}
                    formType={type as FormTypes}
                />
            );

            const button = screen.getByRole("button", { name: `${type}` });

            const user = userEvent.setup();
            await user.click(button);

            expect(setFormType).toHaveBeenCalledWith(type);
        }
    );
});
