// src/hooks/useSearchService.ts

import { useState } from 'react';
import { fetchSearchResults, fetchNextPage } from '../services/searchService';
import { Result, UseSearchService } from '../components/SearchPage/types/object-types';

const useSearchService = (): UseSearchService => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const [pageToken, setPageToken] = useState<string | null>(null);

  // Function to perform the initial search
  const performSearch = async (query: string) => {
    setIsLoading(true);
    setResults([]); // Clear existing results
    setError(null); // Clear any previous errors
    setPageToken(null); // Reset pagination token
    setHasMoreResults(true); // Reset pagination state

    try {
      const response = await fetchSearchResults(query);
      setResults(response.results);
      setPageToken(response.nextPageToken);
      setHasMoreResults(!!response.nextPageToken);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results. Please try again.");
      setHasMoreResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load the next page of results
  const loadMoreResults = async () => {
    if (!pageToken) return; // Stop if there’s no next page token

    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetchNextPage("", pageToken);
      setResults([]); // Append new results
      setPageToken(response.nextPageToken);
      setHasMoreResults(!!response.nextPageToken);
    } catch (err) {
      console.error("Error loading more results:", err);
      setError("Failed to load more results. Please try again.");
      setHasMoreResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    hasMoreResults,
    performSearch,
    loadMoreResults,
  };
};

export default useSearchService;