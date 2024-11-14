// import { render, screen } from '@testing-library/react';
// import App from './App.js';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Spotify Music heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/spotify music/i);
  expect(headingElement).toBeInTheDocument();
});
