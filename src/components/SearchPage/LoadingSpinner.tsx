// src/components/SearchPage/LoadingSpinner.tsx

import React from 'react';
import { LoadingSpinnerProps } from './types/object-types';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;  // Do not render the spinner if not loading
  }

  return (
    <Box sx={{ display: 'flex', margin: '20px' }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;