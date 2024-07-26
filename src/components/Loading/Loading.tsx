import "./loading.scss";

interface LoadingProps {
    width: number;
    height: number;
    unit: string;
    text: string;
}

function Loading({ width, height, unit, text }: LoadingProps) {
    return (
        <div className="loading">
            <p>{text}</p>
            <div
                className="loader"
                style={{
                    width: `${width + unit}`,
                    height: `${height + unit}`,
                }}></div>
        </div>
    );
}

export default Loading;
