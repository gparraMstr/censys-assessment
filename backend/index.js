const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all origins
// This allows the backend to accept requests from other origins (e.g., the React frontend)
app.use(cors());

// Load environment variables from a `.env` file
require('dotenv').config();

// Define the base URL for the external Censys API
const API_BASE_URL = 'https://search.censys.io/api/v2/hosts/search';

// Retrieve API credentials (ID and SECRET) securely from environment variables
const API_ID = process.env.CENSYS_API_ID;
const API_SECRET = process.env.CENSYS_API_SECRET;

// Middleware to parse JSON request bodies
app.use(express.json());

// API route to fetch search results from the Censys API
app.get("/api/fetchSearchResults", async (req, res) => {
    try {
        // Encode the API ID and SECRET as Base64 for Basic Authentication
        const credentials = btoa(`${API_ID}:${API_SECRET}`);

        // Extract query parameters from the request
        const queryPattern = req.query.q; // Search query string
        const perPage = req.query.per_page || 25; // Number of results per page (default: 25)
        const virtualHosts = req.query.virtual_hosts || "EXCLUDE"; // Whether to include virtual hosts
        const sort = req.query.sort || "RELEVANCE"; // Sorting order (default: relevance)
        const cursor = req.query.cursor || null; // Pagination cursor, if provided

        // Build the request body for the Censys API
        let reqBody = {
            q: queryPattern,
            per_page: perPage,
            virtual_hosts: virtualHosts,
            sort: sort,
        };

        // Add the cursor to the request body if it exists (for pagination)
        if (cursor) {
            reqBody.cursor = cursor;
        }

        // Make a POST request to the Censys API
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`, // Basic Authentication header
                'Content-Type': 'application/json', // JSON content type
            },
            body: JSON.stringify(reqBody), // Send the request body as JSON
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Error fetching search results: ${response.statusText}`);
        }

        // Parse the response JSON
        const data = await response.json();

        // Transform the data to a simplified format before sending it to the client
        res.json({
            results: data.result.hits.map((item) => ({
                ip: item.ip, // IP address
                protocols: item.services.map((service) => ({
                    transport: service.transport_protocol, // Transport protocol
                    name: service.service_name, // Service name
                    port: service.port, // Port number
                })),
                // Additional fields can be added here if needed
            })),
            nextPageToken: data.result.links.next, // Token for the next page of results
            total: data.result.total, // Total number of results
        });
    } catch (error) {
        // Log and return a 500 error if something goes wrong
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data", error: error.message });
    }
});

// Serve static files from the React app build directory
// This serves the React app when the backend is running in production
app.use(express.static(path.join(__dirname, "../build")));

// Catch-all handler for React routes
// If no API route matches, serve the React app's `index.html` for client-side routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

// Start the Express server on the specified port or default to 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});