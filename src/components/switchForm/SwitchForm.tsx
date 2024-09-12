import "./switchForm.scss";
import { FormTypes } from "../../App";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SwitchFormProps {
    setFormType: React.Dispatch<React.SetStateAction<FormTypes>>;
    formType: FormTypes;
}

function SwitchForm({ setFormType, formType }: SwitchFormProps) {
    const [position, setPosition] = useState({
        height: 55,
        left: 167,
        width: 146.03125,
    });

    useEffect(() => {
        function setSizeOfBackgroundElement() {
            const size = window.innerWidth;
            if (size < 480) {
                // setFormType("Register");
                setPosition({
                    height: 35,
                    width: 100,
                    left: 102,
                });
            } else {
                // setFormType("Register");
                setPosition({
                    height: 55,
                    width: 146.03125,
                    left: 167,
                });
            }
        }
        window.addEventListener("resize", setSizeOfBackgroundElement);
        setSizeOfBackgroundElement();

        return () =>
            window.removeEventListener("resize", setSizeOfBackgroundElement);
    }, []);

    function changePosition(ref) {
        if (!ref.current) return;

        const { height, width } = ref.current.getBoundingClientRect();

        setPosition({
            height,
            width,
            left: ref.current.offsetLeft,
        });
    }

    return (
        <div className="form__switch">
            <Button
                formType={formType}
                changePosition={changePosition}
                setFormType={setFormType}>
                Login
            </Button>
            <Button
                formType={formType}
                changePosition={changePosition}
                setFormType={setFormType}>
                Register
            </Button>
            <Cursor position={position} />
        </div>
    );
}

function Button({ formType, children, changePosition, setFormType }) {
    const ref = useRef() as MutableRefObject<HTMLButtonElement>;

    return (
        <button
            ref={ref}
            style={{
                color: `${formType === `${children}` ? "black" : "white"}`,
            }}
            onClick={() => {
                setFormType(`${children}`);
                changePosition(ref);
            }}>
            {children}
        </button>
    );
}

function Cursor({ position }) {
    return (
        <motion.div
            animate={position}
            transition={{ duration: 0.3 }}
            className="cursor"></motion.div>
    );
}

export default SwitchForm;
