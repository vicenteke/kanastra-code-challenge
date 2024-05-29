module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
  },
  moduleDirectories: ["node_modules", "src"],
};
