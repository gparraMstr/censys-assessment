// src/components/SearchPage/LoadingSpinner.tsx

import React from 'react';
import { LoadingSpinnerProps } from '../../types/object-types'; // Import type definition for props
import { Box, CircularProgress } from '@mui/material'; // Import Material-UI components for styling and the spinner

/**
 * LoadingSpinner Component
 * A functional component that conditionally renders a loading spinner when data is being loaded.
 * Utilizes Material-UI's CircularProgress component for the spinner and Box for layout.
 *
 * Props:
 * - isLoading: A boolean indicating whether the loading spinner should be displayed.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  // If not loading, return null to avoid rendering the spinner
  if (!isLoading) {
    return null; // No spinner is displayed when isLoading is false
  }

  return (
    // Material-UI Box for flex layout and spacing
    <Box sx={{ display: 'flex', margin: '20px' }}>
      <CircularProgress /> {/* Material-UI CircularProgress for the spinner */}
    </Box>
  );
};

export default LoadingSpinner;