
# Censys Search Application

A React-based web application designed for searching IPv4 hosts and displaying detailed protocol information. The application supports paginated results for seamless navigation and utilizes the Censys REST API for data retrieval. It features a clean and responsive interface styled with Material-UI, a modular component architecture for maintainability and scalability, and modern state management techniques for efficient performance.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Folder Structure](#folder-structure)
4. [Components Overview](#components-overview)
5. [Build Instructions](#build-instructions)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Environment Variables](#environment-variables)

---

## Features

- **Search for IPv4 Hosts**: Enables users to search for IP addresses and view associated protocol details using the Censys REST API.
- **Clean and Paginated Layout**: Displays results in a user-friendly interface with seamless pagination for large datasets.
- **Secure API Calls**: Implements a Node.js proxy server to securely route requests to the Censys REST API, safeguarding sensitive credentials.
- **Environment Variable Configuration**: Utilizes environment variables to securely manage API credentials and configuration, supporting multiple environments (development, testing, production).
- **Modular Component Architecture**: Features a scalable and reusable component-based design for maintainability and future enhancements.
- **Modern UI with Dynamic Feedback**: Styled with Material-UI to deliver a responsive, accessible, and visually appealing interface, featuring a dynamic loading spinner to provide real-time feedback during API calls.
- **Built with React and TypeScript**: Leverages modern web development technologies for strong typing, maintainability, and efficient performance.

---


## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gparraMstr/censys-assessment.git
   cd censys-assessment
   ```

2. **Install Dependencies**

   - **Frontend**:
     Navigate to the root directory (where the `src` folder resides) and install dependencies:
     ```bash
     npm install
     ```

   - **Backend**:
     Navigate to the `backend` folder and install dependencies:
     ```bash
     cd backend
     npm install
     ```

3. **Set Up Environment Variables**

   - **Frontend**:
     Create a `.env` file in the root directory with the following variables:
     ```plaintext
     REACT_APP_CENSYS_API_URL='http://localhost:5001/api/fetchSearchResults' # Backend proxy URL
     BUILD_PATH=./backend/build                                              # Build destination folder
     ```

   - **Backend**:
     Create a `.env` file in the `backend` folder with the following variables:
     ```plaintext
     CENSYS_API_ID=your_api_id
     CENSYS_API_SECRET=your_api_secret
     CENSYS_API_URL=https://search.censys.io/api/v2/hosts/search
     ```

4. **Run the Application**

   First, it will be necessary to build Frontend code prior to running the application.

   - **Frontend**:
     Build the frontend React application:
     ```bash
     npm run build
     ```
   Validate that `build` folder was created under `backend` folder and properly populated as follows:

   ```
   censys-assessment/
   ├── backend/                    # Backend proxy implementation
   │   ├── build/                  # Build folder containing compiled React UI search application
   ```

   Now, there are two ways to run the application: production mode and development mode.

	1.	**Production**: As specified in the assessment requirements, this is a self-contained application that includes both the backend service and the frontend UI. It runs on port `5001`. The backend proxy is started to handle API requests, and the UI application is served as a static build. This setup is ideal for deployment in production environments.

   2. **Development**: Designed for development purposes, this mode allows developers to continue working on the UI application with real-time code reloading. In this mode, both the frontend and backend must be run simultaneously: the backend proxy runs on port `5001`, while the frontend runs on port `3000`. This setup facilitates efficient development and testing.

   Below are the instructions on how to start frontend and/or backend applications.

   - **Backend**:
     Start the backend proxy server:
     ```bash
     cd backend
     node index.js
     ```

   - **Frontend**:
     Start the frontend React application:
     ```bash
     npm run start
     ```

   As previously indicated, the application will run at `http://localhost:3000`, and the backend proxy server will handle API requests at `http://localhost:5001`.

---

## Folder Structure

```
censys-assessment/
├── public/                     # Static assets
├── src/                        # Frontend source code
│   ├── components/             # Reusable React components
│   │   ├── SearchPage/         # Main search page components
│   │   │   ├── SearchPage.tsx  # Main container for search functionality
│   │   │   ├── SearchBar.tsx   # Search input and submit button
│   │   │   ├── ResultList.tsx  # List to display hosts results
│   │   │   ├── ResultItem.tsx  # Component for individual host result
│   │   │   ├── ResultItemProtocol.tsx  # Component for host's protocol results
│   │   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   │   ├── PaginationButton.tsx # Button for loading more results
│   │   └── types/              # TypeScript type definitions
│   ├── reducers/               # Reducer functions for state management
│   │   ├── searchReducer.ts    # Reducer for search-related state
│   ├── services/               # API service functions for frontend
│   │   ├── searchService.ts    # Handles API requests to the backend proxy
│   ├── utils/                  # Utility functions
│   │   ├── formatUtils.ts      # Functions for formatting
│   ├── App.tsx                 # Root component
│   ├── index.tsx               # Entry point for the application
│   ├── App.css                 # Global styles
├── backend/                    # Backend proxy implementation
│   ├── build                   # Folder containing compiled Frontend application
│   ├── index.js                # Main server file for the Node.js proxy
│   ├── package.json            # Backend dependencies and scripts
│   ├── .env                    # Backend environment variables
│   └── README.md               # Documentation for the backend
├── .env                        # Frontend environment variables
├── README.md                   # Documentation
├── package.json                # Frontend dependencies and scripts
```


---

## Components Overview

### `SearchPage`
- **Location**: `src/components/SearchPage/SearchPage.tsx`
- **Purpose**: Main container for search functionality, managing state and rendering sub-components.

### `SearchBar`
- **Location**: `src/components/SearchPage/SearchBar.tsx`
- **Purpose**: Provides a text input for users to submit their search query.

### `ResultList`
- **Location**: `src/components/SearchPage/ResultList.tsx`
- **Purpose**: Displays a list of search results using `ResultItem` for each entry.

### `ResultItem`
- **Location**: `src/components/SearchPage/ResultItem.tsx`
- **Purpose**: Renders details for an individual search result, including associated protocols.

### `LoadingSpinner`
- **Location**: `src/components/SearchPage/LoadingSpinner.tsx`
- **Purpose**: Shows a spinner during loading states.

### `PaginationButton`
- **Location**: `src/components/SearchPage/PaginationButton.tsx`
- **Purpose**: Button to fetch and append the next page of results.

### `searchReducer`
- **Location**: `src/reducers/searchReducer.ts`
- **Purpose**: Handles state transitions for search functionality.

### `searchService`
- **Location**: `src/services/searchService.ts`
- **Purpose**: Contains functions for making API calls to search and fetch paginated results.

---

## Build Instructions

1. **Run the Build Command**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Output Directory**
   By default, the build output is placed in the `build/` directory. If `BUILD_PATH` is specified in `.env`, it will be in the custom directory (e.g., `dist/`).

---

## Testing

1. **Run Tests**
   Ensure you have unit tests set up for your components and reducer.
   ```bash
   npm test
   # or
   yarn test
   ```

2. **Testing Libraries**
   - Jest: Unit testing framework.
   - React Testing Library: For testing React components.

3. **Run All Tests**
   ```bash
   npm run test
   ```

---

## Deployment

### **To Deploy Locally**
1. Build the project:
   ```bash
   npm run build
   ```

2. Serve the build folder:
   ```bash
   npx serve -s build
   ```

### **To Deploy on Production**
Deploy the contents of the `build` (or custom `BUILD_PATH`) directory to your hosting provider (e.g., AWS S3, Netlify, Vercel).

---

## Environment Variables

### Required Variables:
- `REACT_APP_CENSYS_API_ID`: Your API ID for Censys.
- `REACT_APP_CENSYS_API_SECRET`: Your API Secret for Censys.

### Optional Variables:
- `BUILD_PATH`: Custom build folder path.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or issues, please reach out to [Your Name/Your Email] or create an issue on the repository.
