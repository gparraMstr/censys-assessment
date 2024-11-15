// src/components/SearchPage/SearchPage.tsx

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ResultList from './ResultList';
import PaginationButton from './PaginationButton';
import LoadingSpinner from './LoadingSpinner';
import { fetchSearchResults, fetchNextPage } from '../../services/searchService';
import { Result } from './types/object-types';
import { Container } from '@mui/material';


const SearchPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const [pageToken, setPageToken] = useState<string | null>(null);

  // Handle search submission
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setResults([]);  // Clear existing results
    setHasMoreResults(true);
    setPageToken(null);

    try {
      const response = await fetchSearchResults(query);  // Perform search request
      setResults(response.results);
      setPageToken(response.nextPageToken);
      setHasMoreResults(!!response.nextPageToken);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load next page of results
  const loadMoreResults = async () => {
    if (!pageToken) return;  // No more pages to load

    setIsLoading(true);

    try {
      const response = await fetchNextPage(pageToken);  // Fetch next page of results
      setResults((prevResults) => [...prevResults, ...response.results]);  // Append new results
      setPageToken(response.nextPageToken);
      setHasMoreResults(!!response.nextPageToken);
    } catch (error) {
      console.error("Error loading more results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      <LoadingSpinner isLoading={isLoading} />
      <ResultList results={results} />
      <PaginationButton 
        onLoadMore={loadMoreResults} 
        isLoading={isLoading} 
        hasMoreResults={hasMoreResults} 
      />
    </Container>
  );
};

export default SearchPage;