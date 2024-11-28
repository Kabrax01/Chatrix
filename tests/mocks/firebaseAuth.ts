import { vi } from "vitest";

const mocks = vi.hoisted(() => {
    return {
        createUserWithEmailAndPassword: vi.fn(),
    };
});
