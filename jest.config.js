module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts"],
  moduleDirectories: ["node_modules", "lib"],
  moduleNameMapper: {
    "^lib/(.*)": "<rootDir>/lib/$1",
  },
};
