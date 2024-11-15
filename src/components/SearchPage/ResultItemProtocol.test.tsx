// src/components/SearchPage/__tests__/ResultItemProtocol.test.tsx

import { render, screen } from '@testing-library/react';
import { Chip } from '@mui/material';
import ResultItemProtocol from './ResultItemProtocol';
import { Protocol } from '../../types/object-types';

describe('ResultItemProtocol', () => {
  const mockProtocol = {
    name: 'HTTP', port: 80, transport: 'http'
  } as Protocol;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a Chip component', () => {
    render(<ResultItemProtocol protocol={mockProtocol} />);

    // Assert that the mocked Chip is rendered
    expect(screen.getByText('80/HTTP')).toBeInTheDocument();
  });
});