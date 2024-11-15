/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// src/components/SearchPage/__tests__/ResultList.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultList from './ResultList';

describe('ResultList', () => {
  beforeAll(() => {
    // Mock console.error to suppress specific warnings
    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (message.includes('validateDOMNesting')) {
        return; // Ignore the warning
      }
      console.error(message); // Log other errors normally
    });
  });

  afterAll(() => {
    // Restore original console.error after the tests
    jest.restoreAllMocks();
  });

  const mockResults = [
    { ip: '192.168.1.1', protocols: [{ name: 'HTTP', port: 80, transport: 'http' }] },
    { ip: '192.168.1.2', protocols: [{ name: 'HTTPS', port: 443, transport: 'https' }] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when results array is empty', () => {
    render(<ResultList results={[]} total={0}/>);

    expect(screen.queryByTestId('result-item')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders a List component when results are present', () => {
    render(<ResultList results={mockResults} total={2} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveStyle('width: 99%'); // Ensures Material-UI styles are applied
  });

  it('renders the correct number of ResultItem components', () => {
    const { container } = render(<ResultList results={mockResults} total={2}/>);

    const resultItems = container.querySelectorAll('.MuiListItem-root');
    expect(resultItems).toHaveLength(mockResults.length);
  });
});