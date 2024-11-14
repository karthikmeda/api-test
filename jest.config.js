// module.exports = {
//     preset: 'ts-jest/presets/default-esm', // If TypeScript is used
//     extensionsToTreatAsEsm: ['.ts', '.tsx', '.js', '.jsx'],
//     transform: {
//       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//     },
//     transformIgnorePatterns: [
//       '/node_modules/(?!axios)/' // This will transpile axios as well
//     ],
//     // Other Jest configuration options can go here
//     moduleNameMapper: {
//         '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js', // Add this line
//       },
//   };
 
  

  module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Use Babel for JS/JSX transformation
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Include axios in the transformation
    ],
    extensionsToTreatAsEsm: ['.js', '.jsx', '.ts', '.tsx'], // Treat JS/TS/JSX/TSX files as ESM
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js', // Mock CSS imports
    },
    globals: {
      'ts-jest': {
        useESM: true, // Enable ESM support for TypeScript if used
      },
    },
  };
  