// src/App.tsx

import React from 'react';
import './App.css'; // Import global styles
import SearchPage from './components/SearchPage/SearchPage'; // Import the main SearchPage component
import { Box, Typography } from '@mui/material'; // Import Material-UI components for layout and styling

/**
 * App Component
 * The root component of the application that defines the overall structure and layout.
 * It includes a header, main content area, and footer.
 */
const App: React.FC = () => {
  return (
    // Material-UI Box used as the main container with padding
    <Box component="section" sx={{ p: 2 }}>
      {/* Application Header */}
      <header className="app-header">
        <Typography variant="h3" component="h1" gutterBottom>
          Censys Search Application
        </Typography>
        <Typography variant="subtitle1">
          Search for IP addresses and view protocol details.
        </Typography>
      </header>

      {/* Spacer */}
      <Box sx={{ my: 2 }} />

      {/* Main Content Area */}
      <main className="app-content">
        <SearchPage />
      </main>

      {/* Spacer */}
      <Box sx={{ my: 2 }} />

      {/* Footer Section */}
      <footer className="app-footer">
        <Typography variant="body2" color="text.secondary">
          &copy; 2024 Censys Search Application. All rights reserved.
        </Typography>
      </footer>
    </Box>
  );
};

export default App;