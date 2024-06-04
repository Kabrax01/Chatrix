type MainProps = {
    children: React.ReactNode;
    theme: string;
};

function Main({ children, theme }: MainProps) {
    return (
        <main
            className="main"
            style={{
                backgroundImage: `${
                    theme === "dark"
                        ? "url(../../public/bg_dark.jpg)"
                        : "url(../../public/bg_light.jpg)"
                }`,
            }}>
            {children}
        </main>
    );
}

export default Main;
