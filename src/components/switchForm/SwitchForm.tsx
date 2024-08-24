import { FormTypes } from "../../App";

interface SwitchFormProps {
    setFormType: React.Dispatch<React.SetStateAction<FormTypes>>;
    formType: FormTypes;
}

function SwitchForm({ setFormType, formType }: SwitchFormProps) {
    return (
        <div className="form__switch">
            <button
                style={{
                    background: `${
                        formType === "login"
                            ? "hsl(226, 66%, 70%)"
                            : "transparent"
                    }`,
                }}
                onClick={() => setFormType("login")}>
                Log in
            </button>
            <button
                style={{
                    background: `${
                        formType === "register"
                            ? "hsl(226, 66%, 70%)"
                            : "transparent"
                    }`,
                }}
                onClick={() => setFormType("register")}>
                Register
            </button>
        </div>
    );
}

export default SwitchForm;
