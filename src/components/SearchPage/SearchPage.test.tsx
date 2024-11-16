// src/components/SearchPage/__tests__/SearchPage.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from './SearchPage';
import * as searchService from '../../services/searchService'; // Mock the service functions

// Mock child components to focus testing on SearchPage functionality
jest.mock('./SearchBar', () => ({ onSearch, isLoading }: any) => (
    <button onClick={() => onSearch('test-query')} disabled={isLoading}>
        MockSearchBar
    </button>
));

jest.mock('./ResultList', () => ({ results }: any) => (
    <div>MockResultList - {results.length} results</div>
));

jest.mock('./PaginationButton', () => ({ onLoadMore, hasMoreResults }: any) => (
    <button onClick={onLoadMore} disabled={!hasMoreResults}>
        MockPaginationButton
    </button>
));

jest.mock('./LoadingSpinner', () => ({ isLoading }: any) =>
    isLoading ? <div>MockLoadingSpinner</div> : null
);

describe('SearchPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<SearchPage />);
        expect(screen.getByText('MockSearchBar')).toBeInTheDocument();
    });

    it('shows no results message initially', () => {
        render(<SearchPage />);
        expect(screen.getByText(/No results found./i)).toBeInTheDocument();
    });

    it('displays results after a successful search', async () => {
        // Mock fetchSearchResults to return dummy data
        jest.spyOn(searchService, 'fetchSearchResults').mockResolvedValueOnce({
            results: [{ ip: '192.168.0.1', protocols: [] }, { ip: '10.0.0.1', protocols: [] }],
            total: 2,
            nextPageToken: 'token-123',
        });

        render(<SearchPage />);

        // Trigger a search
        fireEvent.click(screen.getByText('MockSearchBar'));

        // Wait for results to appear
        await waitFor(() => {
            expect(screen.getByText(/MockResultList - 2 results/i)).toBeInTheDocument();
        });
    });

    it('displays an error message on search failure', async () => {
        // Mock fetchSearchResults to throw an error
        jest.spyOn(searchService, 'fetchSearchResults').mockRejectedValueOnce(
            new Error('Network error')
        );

        render(<SearchPage />);

        // Trigger a search
        fireEvent.click(screen.getByText('MockSearchBar'));

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText(/Network error/i)).toBeInTheDocument();
        });
    });
});