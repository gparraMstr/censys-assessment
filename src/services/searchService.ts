// src/services/searchService.ts

import { SearchResponse } from "../components/SearchPage/types/object-types";
import { jsonToUrl } from "../utils/formatUtils";

const API_BASE_URL = 'http://localhost:5001/api/fetchSearchResults'; // Adjust this to the actual endpoint if needed

export const fetchSearchResults = async (query: string, perPage: number = 25, 
    virtualHosts: string = "EXCLUDE", sort: string = "RELEVANCE"): Promise<SearchResponse> => {
    const URL_GET = jsonToUrl(API_BASE_URL, {
        q: query,
        per_page: perPage,
        virtual_hosts: virtualHosts,
        sort: sort,
    });

    const response = await fetch(URL_GET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching search results: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

export const fetchNextPage = async (query: string, pageToken: string, perPage: number = 25, 
    virtualHosts: string = "EXCLUDE", sort: string = "RELEVANCE"): Promise<SearchResponse> => {
    
    const URL_GET = jsonToUrl(API_BASE_URL, {
        q: query,
        per_page: perPage,
        virtual_hosts: virtualHosts,
        sort: sort,
        cursor: pageToken
    });

    const response = await fetch(URL_GET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching next page results: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};