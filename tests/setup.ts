import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { vi } from "vitest";

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

vi.mock("firebase/firestore", () => {
    return {
        getFirestore: vi.fn(),
    };
});

vi.mock("firebase/auth", () => {
    return {
        createUserWithEmailAndPassword: vi.fn().mockResolvedValue({
            user: { uid: "sadasdasdasd" },
        }),
        getAuth: vi.fn(),
    };
});

vi.mock("../../firebase/firebase", () => {
    return {
        auth: vi.fn(),
        db: {},
        setDoc: vi.fn(),
        doc: vi.fn(),
    };
});

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
