// src/services/searchService.ts

import { Protocol, SearchResponse } from "../components/SearchPage/types/object-types";

const API_BASE_URL = 'https://search.censys.io/api/v2/hosts/search'; // Adjust this to the actual endpoint if needed

// Make sure your API ID and SECRET stored securely in environment variables
const API_ID = process.env.REACT_APP_CENSYS_API_ID;  
const API_SECRET = process.env.REACT_APP_CENSYS_API_SECRET;  

export const fetchSearchResults = async (query: string): Promise<SearchResponse> => {
  const credentials = btoa(`${API_ID}:${API_SECRET}`);

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: query,
            per_page: 50,
            virtual_hosts: "EXCLUDE",
            sort: "RELEVANCE",
        })
    });

  if (!response.ok) {
    throw new Error(`Error fetching search results: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    results: data.result.hits.map((item: any) => ({
      ip: item.ip,
      protocols: item.services.map((item: any) => ({
         transport: item.transport_protocol,
         name: item.service_name,
         port: item.port,
      } as Protocol)),
      // Map any additional fields here if needed
    })),
    nextPageToken: data.nextPageToken
  };
};

export const fetchNextPage = async (pageToken: string): Promise<SearchResponse> => {
 const credentials = btoa(`${API_ID}:${API_SECRET}`);

  const response = await fetch(`${API_BASE_URL}?page_token=${pageToken}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching next page results: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    results: data.results.map((item: any) => ({
      ip: item.ip,
      protocolCount: item.protocol_count,
      // Map any additional fields here if needed
    })),
    nextPageToken: data.nextPageToken
  };
};