// src/components/SearchPage/PaginationButton.tsx

import React from 'react';
import { PaginationButtonProps } from '../../types/object-types'; // Import type definition for props
import { Button } from '@mui/material'; // Import Material-UI Button component for styling

/**
 * PaginationButton Component
 * A functional component that renders a "Load More Results" button for pagination.
 * The button is conditionally displayed and interacts with the parent component's pagination logic.
 *
 * Props:
 * - onLoadMore: Callback function triggered when the button is clicked to load more results.
 * - isLoading: Indicates whether data is currently being fetched, used to disable the button and show a loading message.
 * - hasMoreResults: Boolean flag to determine if more results are available. If false, the button is not rendered.
 */
const PaginationButton: React.FC<PaginationButtonProps> = ({ onLoadMore, isLoading, hasMoreResults }) => {
  // If there are no more results to load, do not render the button
  if (!hasMoreResults) {
    return null; // Return null to avoid unnecessary rendering
  }

  return (
    // Material-UI Button for loading more results
    <Button
      variant="contained" // Style the button as a contained button
      size="small" // Set the button size to "small"
      onClick={onLoadMore} // Attach the onLoadMore callback to the button's onClick event
      disabled={isLoading} // Disable the button while data is being loaded
    >
      {/* Display "Loading..." while isLoading is true, otherwise show "Load More Results" */}
      {isLoading ? 'Loading...' : 'Load More Results'}
    </Button>
  );
};

export default PaginationButton;