// src/hooks/usePagination.ts

import { useState } from 'react';
import { fetchSearchResults, fetchNextPage } from '../services/searchService';
import { Result, UsePaginationResult } from '../components/SearchPage/types/object-types';

const usePagination = (): UsePaginationResult => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const [pageToken, setPageToken] = useState<string | null>(null);

  // Function to handle the initial search query
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setResults([]);  // Clear existing results
    setPageToken(null);  // Reset pagination token
    setHasMoreResults(true);  // Reset pagination state

    try {
      const response = await fetchSearchResults(query);
      setResults(response.results);
      setPageToken(response.nextPageToken);
      setHasMoreResults(!!response.nextPageToken);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setHasMoreResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load the next page of results
  const loadMoreResults = async () => {
    if (!pageToken) return;  // If no page token, stop pagination

    setIsLoading(true);

    try {
      const response = await fetchNextPage(pageToken);
      setResults((prevResults) => [...prevResults, ...response.results]);  // Append new results
      setPageToken(response.nextPageToken);
      setHasMoreResults(!!response.nextPageToken);
    } catch (error) {
      console.error("Error loading more results:", error);
      setHasMoreResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    hasMoreResults,
    handleSearch,
    loadMoreResults,
  };
};

export default usePagination;