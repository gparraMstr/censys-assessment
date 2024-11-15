// src/components/SearchPage/ResultItem.tsx

import React from 'react';
import { ResultItemProtocolProps } from './types/object-types';
import { Chip } from '@mui/material';

const ResultItemProtocol: React.FC<ResultItemProtocolProps> = ({ protocol }) => {
  const protocolLabel = protocol.port + '/' + protocol.name;
  return (
    <Chip label={protocolLabel} color="primary" size="small" />
  );
};

export default ResultItemProtocol;