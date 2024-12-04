import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { beforeEach, vi } from "vitest";

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

const mocks = vi.hoisted(() => {
    return {
        promiseWithUidMock: vi.fn(
            () =>
                new Promise((resolve) =>
                    setTimeout(() => resolve({ user: { uid: "12345" } }), 100)
                )
        ),
    };
});

vi.mock("firebase/firestore", () => {
    return {
        getFirestore: vi.fn(),
        setDoc: vi.fn(),
        doc: vi.fn(),
        getDoc: vi.fn(mocks.promiseWithUidMock),
    };
});

vi.mock("firebase/auth", () => {
    return {
        createUserWithEmailAndPassword: vi.fn(mocks.promiseWithUidMock),
        signInWithEmailAndPassword: vi.fn(mocks.promiseWithUidMock),
        onAuthStateChanged: vi.fn(),
        getAuth: vi.fn(),
    };
});

vi.mock("../../firebase/firebase", async () => {
    return {
        auth: vi.fn(),
        db: {},
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
