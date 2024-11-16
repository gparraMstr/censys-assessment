// src/utils/__tests__/formatUtils.test.ts

import { formatNumber, formatProtocolCount, jsonToUrl } from './formatUtils';

describe('formatUtils', () => {
    describe('formatProtocolCount', () => {
        it('returns "1 protocol" when the count is 1', () => {
            const result = formatProtocolCount(1);
            expect(result).toBe('1 protocol');
        });

        it('returns "0 protocols" when the count is 0', () => {
            const result = formatProtocolCount(0);
            expect(result).toBe('0 protocols');
        });

        it('returns "5 protocols" when the count is greater than 1', () => {
            const result = formatProtocolCount(5);
            expect(result).toBe('5 protocols');
        });
    });

    describe('jsonToUrl', () => {
        it('appends query parameters to the base URL', () => {
            const baseUrl = 'http://example.com';
            const params = { key1: 'value1', key2: 'value2' };
            const result = jsonToUrl(baseUrl, params);
            expect(result).toBe('http://example.com/?key1=value1&key2=value2');
        });

        it('handles empty parameters gracefully', () => {
            const baseUrl = 'http://example.com';
            const params = {};
            const result = jsonToUrl(baseUrl, params);
            expect(result).toBe('http://example.com/');
        });

        it('ignores undefined or null values in parameters', () => {
            const baseUrl = 'http://example.com';
            const params = { key1: 'value1', key2: undefined, key3: null };
            const result = jsonToUrl(baseUrl, params);
            expect(result).toBe('http://example.com/?key1=value1');
        });

        it('converts non-string parameter values to strings', () => {
            const baseUrl = 'http://example.com';
            const params = { key1: 123, key2: true };
            const result = jsonToUrl(baseUrl, params);
            expect(result).toBe('http://example.com/?key1=123&key2=true');
        });

        it('handles base URLs with existing query parameters', () => {
            const baseUrl = 'http://example.com?existing=value';
            const params = { key1: 'value1' };
            const result = jsonToUrl(baseUrl, params);
            expect(result).toBe('http://example.com/?existing=value&key1=value1');
        });
    });

    describe('formatNumber', () => {
        it('formats a number with commas as thousands separators', () => {
            expect(formatNumber(1234567)).toBe('1,234,567');
        });

        it('formats a number with decimals correctly', () => {
            expect(formatNumber(1234567.89)).toBe('1,234,567.89');
        });

        it('handles small numbers without commas', () => {
            expect(formatNumber(123)).toBe('123');
        });

        it('formats zero correctly', () => {
            expect(formatNumber(0)).toBe('0');
        });

        it('handles negative numbers correctly', () => {
            expect(formatNumber(-1234567)).toBe('-1,234,567');
        });

        it('handles large numbers correctly', () => {
            expect(formatNumber(9876543210)).toBe('9,876,543,210');
        });
        });
});