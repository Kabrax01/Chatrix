type MainProps = {
    children: React.ReactNode;
};

function MainChatView({ children }: MainProps) {
    return (
        <main
            className="main"
            style={{
                backgroundImage: "url(./bg_dark.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            {children}
        </main>
    );
}

export default MainChatView;
