const { vitest } = require("vitest");

module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        "@vitest/env": true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@vitest/legacy-recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "@typescript-eslint", "@vitest"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
    globals: {
        vi: true,
    },
};
