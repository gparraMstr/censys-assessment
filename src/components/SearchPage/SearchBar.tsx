// src/components/SearchPage/SearchBar.tsx

import React, { useState, FormEvent, useCallback } from 'react'; // Import React hooks and types

import { Button, TextField } from '@mui/material'; // Import Material-UI components for styling
import SearchIcon from '@mui/icons-material/Search'; // Import Material-UI icon for the search button
import { SearchBarProps } from '../../types/object-types'; // Import type definition for props

/**
 * SearchBar Component
 * A reusable component that handles search input and submission.
 * It includes a search field and a button, styled with Material-UI.
 *
 * Props:
 * - onSearch: Callback function to handle the search query submission.
 * - isLoading: Indicates whether a search is currently in progress.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
    // Local state to store the value of the search input field
    const [query, setQuery] = useState<string>('');

    /**
     * Handles input changes and updates the query state.
     * Triggered when the user types into the input field.
     * @param event - The input change event
     */
    // Memoize handleInputChange to prevent unnecessary re-creation
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    /**
     * Handles form submission.
     * Prevents the default form behavior and triggers the onSearch callback.
     * Ensures the query is not empty or just whitespace before submitting.
     * @param event - The form submission event
     */
    // Memoize handleSubmit to ensure stable function reference
    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    }, [query, onSearch]);

    return (
        // Form container for the search input and button
        <form onSubmit={handleSubmit} className="search-bar">
            {/* Material-UI TextField for the search input */}
            <TextField
                id="host-search-pattern" // Unique identifier for the input
                size="small" // Sets the size of the input field
                type="search" // Sets the input type to "search"
                onChange={handleInputChange} // Binds the handleInputChange function
                autoFocus={true} // Automatically focuses the input field on render
                value={query} // Binds the input value to the query state
            />

            {/* Material-UI Button for submitting the search */}
            <Button
                variant="contained" // Sets the button style to "contained"
                startIcon={<SearchIcon />} // Adds a search icon to the button
                type="submit" // Specifies the button type as "submit"
            >
                {/* Conditionally render "Loading..." or "Search" based on isLoading */}
                {isLoading ? 'Loading...' : 'Search'}
            </Button>
        </form>
    );
};

export default SearchBar;