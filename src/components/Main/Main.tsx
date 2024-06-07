import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";

type MainProps = {
    children: React.ReactNode;
};

function Main({ children }: MainProps) {
    const theme = useThemeContext();

    return (
        <main
            className="main"
            style={{
                backgroundImage: `${
                    theme === "dark"
                        ? "url(../../public/bg_dark.jpg)"
                        : "url(../../public/bg_light.jpg)"
                }`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}>
            {children}
        </main>
    );
}

export default Main;
