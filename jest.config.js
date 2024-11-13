module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/' // This will transpile axios as well
    ],
    // Other Jest configuration options can go here
  };
  