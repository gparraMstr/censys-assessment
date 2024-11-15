// src/components/SearchPage/__tests__/ResultItem.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultItem from './ResultItem';
import ResultItemProtocol from './ResultItemProtocol';
import { Result } from '../../types/object-types';
import { formatProtocolCount } from '../../utils/formatUtils';

jest.mock('../../utils/formatUtils', () => ({
  formatProtocolCount: jest.fn(),
}));

jest.mock('./ResultItemProtocol', () => {
  return jest.fn(() => <div data-testid="protocol-chip">Protocol Chip</div>);
});

describe('ResultItem', () => {
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

  const mockResult = {
    ip: '192.168.1.1',
    protocols: [
      { name: 'HTTP', port: 80, transport: 'http' },
      { name: 'HTTPS', port: 443, transport: 'https' },
    ],
  } as Result;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the IP address correctly', () => {
    render(<ResultItem result={mockResult} />);

    expect(screen.getByText('192.168.1.1')).toBeInTheDocument();
  });

  it('formats and displays the protocol count', () => {
    (formatProtocolCount as jest.Mock).mockReturnValue('2 protocols');

    render(<ResultItem result={mockResult} />);

    expect(formatProtocolCount).toHaveBeenCalledWith(mockResult.protocols.length);
    expect(screen.getByText('2 protocols')).toBeInTheDocument();
  });

  it('renders "No protocols found" when protocols are absent', () => {
    const resultWithoutProtocols = {
      ip: '192.168.1.2',
      protocols: [],
    };

    render(<ResultItem result={resultWithoutProtocols} />);

    expect(screen.getByText('No protocols found.')).toBeInTheDocument();
  });

  it('renders a divider after the result item', () => {
    render(<ResultItem result={mockResult} />);

    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });
});