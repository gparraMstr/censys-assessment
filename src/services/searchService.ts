// src/services/searchService.ts

import { jsonToUrl } from "../utils/formatUtils"; // Utility function to convert JSON to URL with query parameters
import { SearchResponse } from "../types/object-types"; // Type definition for the response structure

// Base URL for the API endpoint to fetch search results
// Value for this URL is stored in .env file for security purposes.
const API_BASE_URL = process.env.REACT_APP_CENSYS_PROXY_URL || ''; // Adjust this to the actual endpoint if deployed

/**
 * Fetches search results from the backend API.
 *
 * @param query - The search query string.
 * @param perPage - Number of results per page (default: 25).
 * @param virtualHosts - Virtual hosts setting (default: "EXCLUDE").
 * @param sort - Sorting order (default: "RELEVANCE").
 * @returns A promise that resolves to the search response object.
 */
export const fetchSearchResults = async (
    query: string, 
    perPage: number = 25, 
    virtualHosts: string = "EXCLUDE", 
    sort: string = "RELEVANCE"
): Promise<SearchResponse> => {
    // Build the URL with query parameters using the utility function
    const URL_GET = jsonToUrl(API_BASE_URL, {
        q: query,
        per_page: perPage,
        virtual_hosts: virtualHosts,
        sort: sort,
    });

    // Make the GET request to the backend API
    const response = await fetch(URL_GET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' // Specify the request content type
        }
    });

    // Check if the response is successful
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }

    // Parse the response JSON and return it
    const data = await response.json();
    return data;
};

/**
 * Fetches the next page of search results from the backend API.
 *
 * @param query - The search query string.
 * @param pageToken - Token for the next page of results (cursor).
 * @param perPage - Number of results per page (default: 25).
 * @param virtualHosts - Virtual hosts setting (default: "EXCLUDE").
 * @param sort - Sorting order (default: "RELEVANCE").
 * @returns A promise that resolves to the search response object for the next page.
 */
export const fetchNextPage = async (
    query: string, 
    pageToken: string, 
    perPage: number = 25, 
    virtualHosts: string = "EXCLUDE", 
    sort: string = "RELEVANCE"
): Promise<SearchResponse> => {
    // Build the URL with query parameters, including the cursor for pagination
    const URL_GET = jsonToUrl(API_BASE_URL, {
        q: query,
        per_page: perPage,
        virtual_hosts: virtualHosts,
        sort: sort,
        cursor: pageToken // Include the cursor for the next page
    });

    // Make the GET request to the backend API
    const response = await fetch(URL_GET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' // Specify the request content type
        }
    });

    // Check if the response is successful
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }

    // Parse the response JSON and return it
    const data = await response.json();
    return data;
};