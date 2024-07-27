import { CgCloseR } from "react-icons/cg";

interface CloseButtonProps {
    callback: (value) => void;
    height: number;
    width: number;
    unit: string;
}

function CloseButton({ callback, height, width, unit }: CloseButtonProps) {
    const style = {
        display: "block",
        margin: "1rem 1rem 2rem 1rem",
        cursor: "pointer",
        height: `${height + unit}`,
        width: `${width + unit}`,
    };

    return (
        <span>
            <CgCloseR
                style={style}
                onClick={() => callback((prev) => !prev)}
                role="button"
            />
        </span>
    );
}

export default CloseButton;
