import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Load More Results button', () => {
  render(<App />);
  const loadMoreResultsButton = screen.getByRole('button', { name: /LOAD MORE RESULTS/i });
  expect(loadMoreResultsButton).toBeInTheDocument();
});

test('renders Search field and button', () => {
  const { container } = render(<App />);
  const searchButton = screen.getByRole('button', { name: /Search/i });
  expect(searchButton).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const textField = container.querySelector('#host-search-pattern');
  expect(textField).toBeInTheDocument();
});
