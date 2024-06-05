type ThemeButtonProps = {
    handleSetTheme: () => void;
};

function ThemeButton({ handleSetTheme }: ThemeButtonProps) {
    return (
        <button className="theme__btn" onClick={handleSetTheme}>
            Change theme
        </button>
    );
}

export default ThemeButton;
