// src/components/SearchPage/ResultItem.tsx

import React from 'react';
import { ResultItemProps } from '../../types/object-types'; // Import type definitions for props
import ResultItemProtocol from './ResultItemProtocol'; // Import the protocol rendering component
import { Divider, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'; // Material-UI components for styling
import ComputerIcon from '@mui/icons-material/Computer'; // Icon for representing the result item
import { formatProtocolCount } from '../../utils/formatUtils'; // Utility function to format protocol counts

/**
 * ResultItem Component
 * A functional component that renders a single result item with its associated protocols.
 * Uses Material-UI components for consistent styling and layout.
 *
 * Props:
 * - result: An object representing the search result, including its IP address and protocols.
 *
 * Features:
 * - Displays the IP address with an associated icon.
 * - Renders a count of protocols and a list of protocol chips using the ResultItemProtocol component.
 * - Includes a Material-UI Divider to separate items visually.
 */
const ResultItem: React.FC<ResultItemProps> = React.memo(({ result }) => {
    return (
        <React.Fragment>
            {/* Main container for the result item */}
            <ListItem className="result-item">
                {/* Icon representing the result item */}
                <ListItemIcon>
                    <ComputerIcon fontSize="large" />
                </ListItemIcon>

                {/* Main content for the result item */}
                <ListItemText
                    primary={result.ip} // Displays the IP address as the primary text
                    secondary={
                        <React.Fragment>
                            {/* Displays the count of protocols */}
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                {formatProtocolCount(result.protocols.length)}
                            </Typography>

                            {/* Renders a list of protocol chips or a message if no protocols are found */}
                            <Stack 
                                direction="row" 
                                spacing={1} 
                                sx={{ margin: '2px 0px 0px -1px' }}
                            >
                                {result.protocols.length > 0 ? (
                                    result.protocols.map((protocol, index) => (
                                        <ResultItemProtocol 
                                            key={`${result.ip}-${index}`} // Unique key for each protocol chip
                                            protocol={protocol} // Pass the protocol object as a prop
                                        />
                                    ))
                                ) : (
                                    <Typography 
                                        component="p" 
                                        variant="body2" 
                                        className="result-list__no-results"
                                    >
                                        No protocols found.
                                    </Typography>
                                )}
                            </Stack>
                        </React.Fragment>
                    }
                />
            </ListItem>

            {/* Divider for separating items visually */}
            <Divider variant="inset" component="li" />
        </React.Fragment>
    );
});

export default ResultItem;