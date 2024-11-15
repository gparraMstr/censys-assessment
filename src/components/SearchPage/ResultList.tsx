// src/components/SearchPage/ResultList.tsx

import React from 'react';
import ResultItem from './ResultItem';
import { ResultListProps } from './types/object-types';
import { List } from '@mui/material';

const ResultList: React.FC<ResultListProps> = ({ results }) => {
    const areThereAnyResults = results.length > 0;

    if (!areThereAnyResults) return (<></>);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {results.map((result, index) => (
                <ResultItem key={result.ip + index} result={result} />
            ))}
        </List>
    );
};

export default ResultList;