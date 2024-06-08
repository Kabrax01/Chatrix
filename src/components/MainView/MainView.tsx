import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";

type MainProps = {
    children: React.ReactNode;
};

function MainView({ children }: MainProps) {
    const { theme } = useThemeContext();

    return (
        <main
            className="main"
            style={{
                backgroundImage: `${
                    theme === "dark"
                        ? "url(/bg_dark.jpg)"
                        : "url(/bg_light.jpg)"
                }`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}>
            {children}
        </main>
    );
}

export default MainView;
