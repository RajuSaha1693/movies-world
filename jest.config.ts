export default {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "\\.(css|less|scss|svg)$": "identity-obj-proxy",
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}", 
        "!src/**/*.d.ts",
        "!src/services/*.tsx",
        "!**/node_modules/**",
        "!src/main.tsx", 
        "!**/dist/**",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: {
                    jsx: "react-jsx",
                    esModuleInterop: true,
                    allowSyntheticDefaultImports: true,
                    module: "ESNext",
                    moduleResolution: "bundler",
                    isolatedModules: true
                    
                }
            }
        ]
    },
    moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
};