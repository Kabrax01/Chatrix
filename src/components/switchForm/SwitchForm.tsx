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
        height: 0,
        left: 0,
        width: 0,
    });

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
        <div className="switch__container">
            <div className="switch--logo">
                <img
                    className="logo--small"
                    src="./logo-small-cropped.svg"
                    alt=""
                />
                <h1 className="logo__header">Chatrix</h1>
            </div>
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
        </div>
    );
}

function Button({ formType, children, changePosition, setFormType }) {
    const ref = useRef() as MutableRefObject<HTMLButtonElement>;

    useEffect(() => {
        function resize() {
            if (children === formType) changePosition(ref);
        }

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    });

    useEffect(() => {
        changePosition(ref);
    }, []);

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
