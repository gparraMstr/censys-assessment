// src/components/SearchPage/__tests__/PaginationButton.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationButton from './PaginationButton';

describe('PaginationButton', () => {
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render the button when hasMoreResults is false', () => {
    render(<PaginationButton onLoadMore={mockOnLoadMore} isLoading={false} hasMoreResults={false} />);
    
    expect(screen.queryByRole('button', { name: /load more results/i })).not.toBeInTheDocument();
  });

  it('renders the button when hasMoreResults is true', () => {
    render(<PaginationButton onLoadMore={mockOnLoadMore} isLoading={false} hasMoreResults={true} />);
    
    expect(screen.getByRole('button', { name: /load more results/i })).toBeInTheDocument();
  });

  it('disables the button and shows "Loading..." when isLoading is true', () => {
    render(<PaginationButton onLoadMore={mockOnLoadMore} isLoading={true} hasMoreResults={true} />);
    
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
  });

  it('enables the button and shows "Load More Results" when isLoading is false', () => {
    render(<PaginationButton onLoadMore={mockOnLoadMore} isLoading={false} hasMoreResults={true} />);
    
    const button = screen.getByRole('button', { name: /load more results/i });
    expect(button).toBeEnabled();
  });

  it('calls onLoadMore when the button is clicked', () => {
    render(<PaginationButton onLoadMore={mockOnLoadMore} isLoading={false} hasMoreResults={true} />);
    
    const button = screen.getByRole('button', { name: /load more results/i });
    fireEvent.click(button);
    
    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });
});