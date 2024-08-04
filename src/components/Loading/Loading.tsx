import "./loading.scss";

interface LoadingProps {
    width: number;
    height: number;
    unit: string;
    margin?: string;
    text?: string;
    color?: string;
}

function Loading({
    width,
    height,
    unit,
    margin = "0",
    text = "",
    color = "",
}: LoadingProps) {
    return (
        <div className="loading">
            {text && <p>{text}</p>}
            <div
                className="loader"
                style={{
                    width: `${width + unit}`,
                    height: `${height + unit}`,
                    margin: `${margin}`,
                    color: `${color}`,
                }}></div>
        </div>
    );
}

export default Loading;
