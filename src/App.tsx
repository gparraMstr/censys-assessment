// src/App.tsx

import React from 'react';
import './App.css';
import SearchPage from './components/SearchPage/SearchPage';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
     <Box component="section" sx={{ p: 2 }}>
      <header className="app-header">
        <h1>Censys Search Application</h1>
        <p>Search for IP addresses and view protocol details.</p>
      </header>
      <br/>
      <main className="app-content">
        <SearchPage />
      </main>
      <br/>
      <footer className="app-footer">
        <p>&copy; 2024 Censys Search Application. All rights reserved.</p>
      </footer>
    </Box>
  );
};

export default App;