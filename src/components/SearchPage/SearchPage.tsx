// src/components/SearchPage/SearchPage.tsx

import React, { useReducer, useState } from 'react';
import SearchBar from './SearchBar'; // Component for the search input and submit button
import ResultList from './ResultList'; // Component to display the list of results
import PaginationButton from './PaginationButton'; // Button to load more results
import LoadingSpinner from './LoadingSpinner'; // Spinner for loading state
import { fetchSearchResults, fetchNextPage } from '../../services/searchService'; // API service functions
import { Box, Typography } from '@mui/material'; // Material-UI components for layout and styling
import { searchReducer, initialState } from '../../reducers/searchReducer'; // Import the search reducer and initial state


/**
 * SearchPage Component
 * The main component that handles:
 * - Search query submission
 * - Displaying search results
 * - Pagination for additional results
 * - Loading state and error handling
 */
const SearchPage: React.FC = () => {
  // useReducer hook to manage search-related state
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Destructure state variables for easier usage
  const { results, isLoading, hasMoreResults, pageToken, total, query } = state;

  const [errorMsg, setErrorMsg] = useState<string>('');

  /**
   * Handles a new search query submission.
   * Clears previous results and fetches the first page of new results.
   * @param newQuery - The search query string
   */
  const handleSearch = async (newQuery: string) => {
    dispatch({ type: 'SET_LOADING', payload: true }); // Start loading
    dispatch({ type: 'SET_QUERY', payload: newQuery }); // Update the query

    try {
      const response = await fetchSearchResults(newQuery); // Fetch results from the API
      dispatch({
        type: 'SET_RESULTS',
        payload: {
          results: response.results,
          total: response.total,
          pageToken: response.nextPageToken,
          hasMore: !!response.nextPageToken, // Determine if more results are available
        },
      });
    } catch (error) {
      dispatch({ type: 'CLEAR_RESULTS' }); // End loading
      setErrorMsg(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  /**
   * Loads the next page of search results.
   * Appends new results to the existing list and updates pagination state.
   */
  const loadMoreResults = async () => {
    if (!pageToken) return; // Stop if no next page token is available

    dispatch({ type: 'SET_LOADING', payload: true }); // Start loading

    try {
      const response = await fetchNextPage(query, pageToken); // Fetch the next page of results
      dispatch({
        type: 'APPEND_RESULTS',
        payload: {
          results: response.results,
          pageToken: response.nextPageToken,
          hasMore: !!response.nextPageToken, // Determine if more results are available
        },
      });
    } catch (error) {
      console.error('Error loading more results:', error); // Log errors
      dispatch({ type: 'SET_LOADING', payload: false }); // End loading
    }
  };

  // Check if there are any results to display
  const areThereAnyResults = results.length > 0;

  return (
    <Box sx={{ p: 2 }}>
      {/* Search bar for user input */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Conditional rendering for results or no-results message */}
      {!areThereAnyResults && !isLoading ? (
        <Typography variant="body1" color="text.secondary" sx={{ margin: '20px' }}>
          { errorMsg || 'No results found.'}
        </Typography>
      ) : (
        <>
          {/* Display the list of results */}
          <ResultList results={results} total={total} />

          {/* Show loading spinner while fetching data */}
          {isLoading && <LoadingSpinner isLoading={isLoading} />}
        </>
      )}

      {/* Pagination button to load more results */}
      <Box sx={{ mt: 2 }}>
        <PaginationButton
          onLoadMore={loadMoreResults}
          isLoading={isLoading}
          hasMoreResults={hasMoreResults}
        />
      </Box>
    </Box>
  );
};

export default SearchPage;