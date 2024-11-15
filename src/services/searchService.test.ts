// src/services/__tests__/searchService.test.ts

import { SearchResponse } from "../types/object-types";
import { jsonToUrl } from "../utils/formatUtils";
import { fetchNextPage, fetchSearchResults } from "./searchService";

jest.mock("../utils/formatUtils");

describe("searchService", () => {
    const API_BASE_URL = "http://localhost:5001/api/fetchSearchResults";
    const mockJsonToUrl = jsonToUrl as jest.Mock;

    beforeEach(() => {
        process.env.REACT_APP_CENSYS_PROXY_URL = API_BASE_URL;
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchSearchResults", () => {
        it("should fetch search results with correct URL and return data", async () => {
            const query = "test";
            const responseMock: SearchResponse = {
                results: [], total: 0,
                nextPageToken: ""
            }; // Mock response data
            const mockUrl = `${API_BASE_URL}?q=${query}&per_page=25&virtual_hosts=EXCLUDE&sort=RELEVANCE`;

            mockJsonToUrl.mockReturnValue(mockUrl);
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue(responseMock),
            });

            const result = await fetchSearchResults(query);

            expect(mockJsonToUrl).toHaveBeenCalledWith(API_BASE_URL, {
                q: query,
                per_page: 25,
                virtual_hosts: "EXCLUDE",
                sort: "RELEVANCE",
            });
            expect(fetch).toHaveBeenCalledWith(mockUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            expect(result).toEqual(responseMock);
        });

        it("should throw an error if the response is not ok", async () => {
            const query = "test";
            const mockUrl = `${API_BASE_URL}?q=${query}&per_page=25&virtual_hosts=EXCLUDE&sort=RELEVANCE`;

            mockJsonToUrl.mockReturnValue(mockUrl);
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Not Found",
            });

            await expect(fetchSearchResults(query)).rejects.toThrow(
                "Error fetching search results: Not Found"
            );

            expect(mockJsonToUrl).toHaveBeenCalledWith(API_BASE_URL, {
                q: query,
                per_page: 25,
                virtual_hosts: "EXCLUDE",
                sort: "RELEVANCE",
            });
            expect(fetch).toHaveBeenCalledWith(mockUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
        });
    });

    describe("fetchNextPage", () => {
        it("should fetch next page results with correct URL and return data", async () => {
            const query = "test";
            const pageToken = "nextPageToken";
            const responseMock: SearchResponse = {
                results: [], total: 0,
                nextPageToken: ""
            }; // Mock response data
            const mockUrl = `${API_BASE_URL}?q=${query}&per_page=25&virtual_hosts=EXCLUDE&sort=RELEVANCE&cursor=${pageToken}`;

            mockJsonToUrl.mockReturnValue(mockUrl);
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue(responseMock),
            });

            const result = await fetchNextPage(query, pageToken);

            expect(mockJsonToUrl).toHaveBeenCalledWith(API_BASE_URL, {
                q: query,
                per_page: 25,
                virtual_hosts: "EXCLUDE",
                sort: "RELEVANCE",
                cursor: pageToken,
            });
            expect(fetch).toHaveBeenCalledWith(mockUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            expect(result).toEqual(responseMock);
        });

        it("should throw an error if the response is not ok", async () => {
            const query = "test";
            const pageToken = "nextPageToken";
            const mockUrl = `${API_BASE_URL}?q=${query}&per_page=25&virtual_hosts=EXCLUDE&sort=RELEVANCE&cursor=${pageToken}`;

            mockJsonToUrl.mockReturnValue(mockUrl);
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Internal Server Error",
            });

            await expect(fetchNextPage(query, pageToken)).rejects.toThrow(
                "Error fetching next page results: Internal Server Error"
            );

            expect(mockJsonToUrl).toHaveBeenCalledWith(API_BASE_URL, {
                q: query,
                per_page: 25,
                virtual_hosts: "EXCLUDE",
                sort: "RELEVANCE",
                cursor: pageToken,
            });
            expect(fetch).toHaveBeenCalledWith(mockUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
        });
    });
});