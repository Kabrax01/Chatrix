import { useThemeContext } from "../../contexts/themeContext/ThemeContext";
import "./themeButton.scss";

function ThemeButton() {
    const { theme, setTheme } = useThemeContext();

    return (
        <button
            className="theme__btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            Change theme
        </button>
    );
}

export default ThemeButton;
