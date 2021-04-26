module.exports = {
  testURL: "http://localhost:9000",
  rootDir: "../",
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/jest/setupTests.js",
  ],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@components/(.*)": "<rootDir>/src/components/$1",
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
