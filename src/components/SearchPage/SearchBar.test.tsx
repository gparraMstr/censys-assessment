// src/components/SearchPage/__tests__/SearchBar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides matchers like toBeInTheDocument()
import SearchBar from './SearchBar'; // Import the component to be tested
import { SearchBarProps } from '../../types/object-types';

describe('SearchBar Component', () => {
    // Mock props
    const mockOnSearch = jest.fn();
    const defaultProps: SearchBarProps = {
        onSearch: mockOnSearch,
        isLoading: false,
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock function call history before each test
    });

    it('displays "Loading..." when isLoading is true', () => {
        render(<SearchBar {...defaultProps} isLoading={true} />);

        // Assert that the button displays "Loading..."
        const loadingButton = screen.getByRole('button', { name: /loading.../i });
        expect(loadingButton).toBeInTheDocument();
    });

    it('displays "Search" when isLoading is false', () => {
        render(<SearchBar {...defaultProps} />);

        // Assert that the button displays "Search"
        const searchButton = screen.getByRole('button', { name: /search/i });
        expect(searchButton).toBeInTheDocument();
    });
});