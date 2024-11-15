// src/components/SearchPage/ResultItem.tsx

import React from 'react';
import { ResultItemProps } from './types/object-types';
import ResultItemProtocol from './ResultItemProtocol';
import { Divider, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import { formatProtocolCount } from '../../utils/formatUtils';

const ResultItem: React.FC<ResultItemProps> = React.memo(({ result }) => {
    return (
        <React.Fragment>
            <ListItem className="result-item">
                <ListItemIcon>
                    <ComputerIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    primary={result.ip}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                {formatProtocolCount(result.protocols.length)}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ margin: '2px 0px 0px -1px' }}>
                                {result.protocols.length > 0 ? (
                                    result.protocols.map((protocol, index) => (
                                        <ResultItemProtocol key={result.ip + index} protocol={protocol} />
                                    ))
                                ) : (
                                    <p className="result-list__no-results">No protocols found.</p>
                                )}
                            </Stack>

                        </React.Fragment>
                    }
                />
                {/* Additional fields can be displayed here if needed */}
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    );
});

export default ResultItem;