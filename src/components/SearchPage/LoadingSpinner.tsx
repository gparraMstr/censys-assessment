// src/components/SearchPage/LoadingSpinner.tsx

import React from 'react';
import { LoadingSpinnerProps } from './types/object-types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;  // Do not render the spinner if not loading
  }

  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;