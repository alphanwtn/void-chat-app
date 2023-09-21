module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb", "airbnb-typescript", "prettier", "plugin:react/jsx-runtime"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
        "react/destructuring-assignment": "off",
        "react/jsx-props-no-spreading": "off",
    },
    parserOptions: {
        project: "./void_front/tsconfig.json",
    },
    ignorePatterns: ["*.cjs", "src/*.css", "*.svg", "vite.config.ts"],
};
