import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { vi } from "vitest";
import { initializeApp } from "firebase/app";

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

vi.mock("../../firebase/firebase.js", () => {
    return {
        auth: {},
        db: {},
        createUserWithEmailAndPassword: vi.fn().mockResolvedValue({
            user: { uid: "1234" },
        }),
        setDoc: vi.fn(),
        doc: vi.fn(),
    };
});

const firebaseConfig = {
    apiKey: "test-api-key",
    authDomain: "test-auth-domain",
    projectId: "test-project-id",
    storageBucket: "test-storage-bucket",
    messagingSenderId: "test-sender-id",
    appId: "test-app-id",
};

export const app = initializeApp(firebaseConfig);

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
