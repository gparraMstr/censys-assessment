// src/components/SearchPage/ResultList.tsx

import React from 'react';
import ResultItem from './ResultItem';
import { ResultListProps } from './types/object-types';
import { Divider, List } from '@mui/material';

const ResultList: React.FC<ResultListProps> = ({ results }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {results.length > 0 ? (
                results.map((result, index) => (
                    <React.Fragment>
                        <ResultItem key={result.ip + index} result={result} />
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))
            ) : (
                <p className="result-list__no-results">No results found.</p>
            )}
        </List>
    );
};

export default ResultList;