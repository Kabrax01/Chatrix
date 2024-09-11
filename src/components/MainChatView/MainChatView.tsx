import { useThemeContext } from "../../contexts/themeContext/ThemeContext";

type MainProps = {
    children: React.ReactNode;
};

function MainChatView({ children }: MainProps) {
    const { theme } = useThemeContext();

    return (
        <main
            className="main"
            style={{
                backgroundImage: `${
                    theme === "dark"
                        ? "url(./bg_dark.jpg)"
                        : "url(./bg_light.jpg)"
                }`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            {children}
        </main>
    );
}

export default MainChatView;
