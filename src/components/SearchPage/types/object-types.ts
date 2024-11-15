export interface Protocol {
  transport: string;
  name: string;
  port: number;
}

export interface SearchResponse {
  results: Array<Result>;
  nextPageToken: string;  // Token for the next page, if provided by the API
}

export interface Result {
  ip: string;
  protocols: Protocol[];
  // Add other fields as necessary based on API response
}

export interface ResultItemProps {
  result: Result;
}

export interface ResultItemProtocolProps {
  protocol: Protocol;
}

export interface ResultListProps {
  results: Result[];  // Array of result objects to display
}

export interface LoadingSpinnerProps {
  isLoading: boolean;  // Controls whether the spinner is visible
}

export interface PaginationButtonProps {
  onLoadMore: () => void;       // Callback function to load more results
  isLoading: boolean;           // Boolean to indicate if data is currently loading
  hasMoreResults: boolean;      // Boolean to indicate if there are more results to load
}

export interface SearchBarProps {
  onSearch: (query: string) => void;  // Callback function to handle search queries
  isLoading: boolean;           // Boolean to indicate if data is currently loading
}


export interface UsePaginationResult {
  results: Result[];
  isLoading: boolean;
  hasMoreResults: boolean;
  handleSearch: (query: string) => Promise<void>;
  loadMoreResults: () => Promise<void>;
}

export interface UseSearchService {
  results: Result[];
  isLoading: boolean;
  error: string | null;
  hasMoreResults: boolean;
  performSearch: (query: string) => Promise<void>;
  loadMoreResults: () => Promise<void>;
}
