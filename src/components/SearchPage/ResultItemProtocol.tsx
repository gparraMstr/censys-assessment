// src/components/SearchPage/ResultItem.tsx

import React from 'react';
import { ResultItemProtocolProps } from '../../types/object-types'; // Import type definition for props
import { Chip } from '@mui/material'; // Import Material-UI Chip component for styling and functionality

/**
 * ResultItemProtocol Component
 * A functional component that renders a protocol as a styled Chip using Material-UI.
 *
 * Props:
 * - protocol: An object representing the protocol, including its port and name.
 *
 * Features:
 * - Displays a label in the format "port/name" (e.g., "80/http").
 * - Uses Material-UI's Chip component for a visually consistent UI.
 */
const ResultItemProtocol: React.FC<ResultItemProtocolProps> = ({ protocol }) => {
  // Create a label for the Chip component in the format "port/name"
  const protocolLabel = protocol.port + '/' + protocol.name;

  return (
    // Render a Material-UI Chip with the protocol label
    <Chip 
      label={protocolLabel} // Text to display inside the Chip
      color="primary" // Sets the Chip's color style to "primary"
      size="small" // Sets the Chip's size to "small"
    />
  );
};

export default ResultItemProtocol;