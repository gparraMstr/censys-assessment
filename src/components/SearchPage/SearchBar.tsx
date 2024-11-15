// src/components/SearchPage/SearchBar.tsx

import React, { useState, FormEvent } from 'react';
import { SearchBarProps } from './types/object-types';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState<string>('');  // Local state for the search input

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (query.trim()) {
            onSearch(query);  // Call the parent component's onSearch function with the query
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <TextField id="host-search-pattern" size="small"
             type="search" onChange={handleInputChange}
        autoFocus={true} 
               value={query}/>

            <Button variant="contained" startIcon={<SearchIcon/>} type="submit">
                {isLoading ? 'Loading...' : 'Search'}
            </Button>
        </form>
    );
};

export default SearchBar;