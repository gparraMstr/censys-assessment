// src/components/SearchPage/ResultList.tsx

import React from 'react';
import ResultItem from './ResultItem'; // Component to display individual results
import { List } from '@mui/material'; // Material-UI List component for styling and structure
import { ResultListProps } from '../../types/object-types'; // Type definition for the props

/**
 * ResultList Component
 * A functional component that renders a list of results using Material-UI's List component.
 * Each result is displayed using the ResultItem component.
 *
 * Props:
 * - results: An array of result objects to be rendered.
 *
 * Features:
 * - Renders nothing if the results array is empty.
 * - Uses React.memo for performance optimization by preventing unnecessary re-renders.
 */
const ResultList: React.FC<ResultListProps> = React.memo(({ results }) => {
    // Determine if there are any results to display
    const areThereAnyResults = results.length > 0;

    // If no results are present, return an empty fragment
    if (!areThereAnyResults) return (<></>);

    return (
        // Material-UI List component to structure the result items
        <List sx={{ width: '99%', bgcolor: 'background.paper' }}>
            {/* Map over the results array to render each result using the ResultItem component */}
            {results.map((result, index) => (
                <ResultItem 
                    key={result.ip + index} // Unique key to help React efficiently update the DOM
                    result={result} // Pass individual result data as a prop to ResultItem
                />
            ))}
        </List>
    );
});

export default ResultList;