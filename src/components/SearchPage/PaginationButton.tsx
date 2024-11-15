// src/components/SearchPage/PaginationButton.tsx

import React from 'react';
import { PaginationButtonProps } from './types/object-types';
import { Button } from '@mui/material';

const PaginationButton: React.FC<PaginationButtonProps> = ({ onLoadMore, isLoading, hasMoreResults }) => {
  if (!hasMoreResults) {
    return null;  // Don't render the button if there are no more results to load
  }

  return (
    <Button variant="contained" size="small"
      onClick={onLoadMore}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Load More Results'}
    </Button>
  );
};

export default PaginationButton;