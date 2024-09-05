import { CgCloseR } from "react-icons/cg";

interface CloseButtonProps {
    callback: (value) => void;
    height?: number;
    width?: number;
    unit?: string;
    margin?: string;
}

function CloseButton({
    callback,
    height = 1.3,
    width = 1.3,
    unit = "rem",
    margin = "1rem 1rem 1rem 1rem",
}: CloseButtonProps) {
    const style = {
        display: "block",
        margin: margin,
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
