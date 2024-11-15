// src/utils/formatUtils.ts


/**
 * Formats the protocol count with proper singular/plural handling.
 * @param protocolCount - The number of protocols associated with the host
 * @returns A formatted string like "1 protocol" or "5 protocols"
 */
export const formatProtocolCount = (protocolCount: number): string => {
  return `${protocolCount} ${protocolCount === 1 ? 'protocol' : 'protocols'}`;
};


/**
 * Converts a base URL and a JSON object into a URL with GET parameters.
 *
 * @param baseUrl - The base URL to which parameters will be appended.
 * @param params - A JSON object representing the query parameters.
 * @returns A string with the complete URL containing GET parameters.
 */
export const jsonToUrl = (baseUrl: string, params: Record<string, any>): string => {
    const url = new URL(baseUrl);
    
    // Iterate over the JSON object and append each key-value pair to the URL's search params
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
        }
    });

    return url.toString();
};