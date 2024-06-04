type ButtonProps = {
    handleSetTheme: () => void;
};

function ThemeButton({ handleSetTheme }: ButtonProps) {
    return (
        <button className="theme__btn" onClick={handleSetTheme}>
            Change theme
        </button>
    );
}

export default ThemeButton;
