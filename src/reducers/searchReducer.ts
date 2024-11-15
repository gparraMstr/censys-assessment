// src/reducers/searchReducer.ts

import { Result } from '../types/object-types'; // Import type definition for search results

/**
 * Initial state for the search reducer.
 * - `results`: List of search results.
 * - `isLoading`: Indicates if a request is in progress.
 * - `hasMoreResults`: Boolean flag for additional pages of results.
 * - `pageToken`: Token for the next page of results (if any).
 * - `total`: Total number of results for the current query.
 * - `query`: The current search query string.
 */
export const initialState = {
  results: [] as Result[],
  isLoading: false,
  hasMoreResults: true,
  pageToken: null as string | null,
  total: 0,
  query: '',
};

// Define action types for state transitions
type Action =
  | { type: 'SET_LOADING'; payload: boolean } // Action to toggle loading state
  | { type: 'SET_RESULTS'; payload: { results: Result[]; total: number; pageToken: string | null; hasMore: boolean } } // Action to set new results
  | { type: 'APPEND_RESULTS'; payload: { results: Result[]; pageToken: string | null; hasMore: boolean } } // Action to append results
  | { type: 'SET_QUERY'; payload: string }; // Action to set the current query

/**
 * Reducer function to manage search-related state transitions.
 * @param state - The current state of the search page.
 * @param action - The dispatched action containing the type and payload.
 * @returns The updated state based on the action type.
 */
export const searchReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'SET_LOADING':
      // Toggle loading state
      return { ...state, isLoading: action.payload };

    case 'SET_RESULTS':
      // Replace results with a new query's results
      return {
        ...state,
        results: action.payload.results,
        total: action.payload.total,
        pageToken: action.payload.pageToken,
        hasMoreResults: action.payload.hasMore,
        isLoading: false, // End loading
      };

    case 'APPEND_RESULTS':
      // Append results from the next page
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        pageToken: action.payload.pageToken,
        hasMoreResults: action.payload.hasMore,
        isLoading: false, // End loading
      };

    case 'SET_QUERY':
      // Update the current search query
      return { ...state, query: action.payload };

    default:
      // Throw an error for unrecognized action types
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
};