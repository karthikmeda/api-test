module.exports = {
    preset: 'ts-jest/presets/default-esm', // If TypeScript is used
    extensionsToTreatAsEsm: ['.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/' // This will transpile axios as well
    ],
    // Other Jest configuration options can go here
  };
 