// src/utils/formatUtils.ts

/**
 * Formats an IP address by ensuring it’s a valid IPv4 or IPv6 format.
 * Could also mask parts of the IP for privacy if needed.
 * @param ip - The IP address to format
 * @returns A formatted IP address or "Invalid IP" if the format is not recognized.
 */
export const formatIpAddress = (ip: string): string => {
  // Basic validation for IPv4 or IPv6 formats, could be expanded as needed
  const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  if (ipv4Regex.test(ip)) {
    return ip; // Valid IPv4
  } else if (ipv6Regex.test(ip)) {
    return ip; // Valid IPv6
  } else {
    return "Invalid IP";
  }
};

/**
 * Formats the protocol count with proper singular/plural handling.
 * @param protocolCount - The number of protocols associated with the host
 * @returns A formatted string like "1 protocol" or "5 protocols"
 */
export const formatProtocolCount = (protocolCount: number): string => {
  return `${protocolCount} ${protocolCount === 1 ? 'protocol' : 'protocols'}`;
};

/**
 * Limits the length of a string to a specified number of characters, adding ellipses if truncated.
 * Useful for displaying long fields in a limited space.
 * @param text - The text to truncate
 * @param maxLength - The maximum length of the truncated text
 * @returns The truncated string with ellipses if necessary
 */
export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Converts a date string into a more readable format (e.g., "YYYY-MM-DD").
 * Assumes the date string is in ISO format.
 * @param dateStr - The ISO date string to format
 * @returns The formatted date string or "Invalid Date" if parsing fails
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toISOString().split('T')[0];
};