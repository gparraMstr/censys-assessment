// src/reducers/searchReducer.test.ts

import { searchReducer, initialState, Action } from './searchReducer';
import { ActionAppendResults, ActionResults } from '../types/object-types';

describe('searchReducer', () => {
  it('should handle SET_LOADING action', () => {
    const action = { type: 'SET_LOADING', payload: true } as Action;
    const newState = searchReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle SET_RESULTS action', () => {
    const action: { type: 'SET_RESULTS'; payload: ActionResults } = {
      type: 'SET_RESULTS',
      payload: {
        results: [{ ip: '1.1.1.1', protocols: [] }],
        total: 1,
        pageToken: 'next-token',
        hasMore: true,
      },
    };

    const newState = searchReducer(initialState, action);
    expect(newState.results).toEqual([{ ip: '1.1.1.1', protocols: [] }]);
    expect(newState.total).toBe(1);
    expect(newState.pageToken).toBe('next-token');
    expect(newState.hasMoreResults).toBe(true);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle APPEND_RESULTS action', () => {
    const initialStateWithResults = {
      ...initialState,
      results: [{ ip: '1.1.1.1', protocols: [] }],
    };

    const action: { type: 'APPEND_RESULTS'; payload: ActionAppendResults } = {
      type: 'APPEND_RESULTS',
      payload: {
        results: [{ ip: '2.2.2.2', protocols: [] }],
        pageToken: 'next-token',
        hasMore: true,
      },
    };

    const newState = searchReducer(initialStateWithResults, action);
    expect(newState.results).toEqual([
      { ip: '1.1.1.1', protocols: [] },
      { ip: '2.2.2.2', protocols: [] },
    ]);
    expect(newState.pageToken).toBe('next-token');
    expect(newState.hasMoreResults).toBe(true);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle SET_QUERY action', () => {
    const action = { type: 'SET_QUERY', payload: 'new query' } as Action;
    const newState = searchReducer(initialState, action);
    expect(newState.query).toBe('new query');
  });
});