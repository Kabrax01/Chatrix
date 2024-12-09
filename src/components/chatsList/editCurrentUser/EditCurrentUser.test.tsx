import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import EditCurrentUser from "./EditCurrentUser";
import ChatContextProvider from "../../../contexts/chatContext/ChatContext";
import ListContextProvider from "../../../contexts/listContext/ListContext";
import userEvent from "@testing-library/user-event";
import { updateDoc } from "firebase/firestore";
import uploadUserImg from "@/firebase/uploadUserImg";

// const mocks = vi.hoisted(() => {
//     return {
//         successMock: vi.fn(
//             () => new Promise((resolve) => setTimeout(() => resolve({}), 100))
//         ),
//         rejectMock: vi.fn(
//             () => new Promise((reject) => setTimeout(() => reject({}), 100))
//         ),
//     };
// });

// vi.mock("firebase/firestore", () => {
//     return {
//         updateDoc: vi.fn(),
//     };
// });

// vi.mock("../../../firebase/uploadUserImg.js", () => {
//     return {
//         uploadUserImg: vi.fn(),
//     };
// });

describe("EditCurrentUser", () => {
    const renderComponent = () => {
        render(
            <ListContextProvider>
                <ChatContextProvider>
                    <EditCurrentUser />
                </ChatContextProvider>
            </ListContextProvider>
        );

        return {
            fileInput: screen.getByTestId("fileInput"),
            nameInput: screen.getByRole("textbox", { name: /name/i }),
            submitButton: screen.getByRole("button", { name: /submit/i }),
            user: userEvent.setup(),
        };
    };

    it("should render all elements", () => {
        const { fileInput, nameInput, submitButton } = renderComponent();

        expect(fileInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("should show upload indicator when form is submitted", async () => {
        const { nameInput, submitButton, user } = renderComponent();

        await user.type(nameInput, "John Doe");
        await user.click(submitButton);
        const uploadIndicator = screen.queryByText(/uploading/i);

        expect(uploadIndicator).toBeInTheDocument();
    });

    it("should show an success message when user name change is successful", async () => {
        const { nameInput, submitButton, user } = renderComponent();

        await user.type(nameInput, "John Doe");
        await user.click(submitButton);
        await waitForElementToBeRemoved(screen.queryByText(/uploading/i));
        const successMessage = screen.getByText(/upload successful/i);

        expect(successMessage).toBeInTheDocument();
    });

    it.only("should throw an error if selected file size is grater than 1MB", async () => {
        const { submitButton, user } = renderComponent();

        const largeFile = new File(["hello"], "largeImage.jpg", {
            type: "image/jpeg",
        });
        Object.defineProperty(largeFile, "size", { value: 10000001 });
        const fileInput = screen.getByTestId("fileInput");
        await user.upload(fileInput, largeFile);
        await user.click(submitButton);

        const errorMessage = await screen.getByText(/file size/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
