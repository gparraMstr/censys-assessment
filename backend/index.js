const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Enable CORS for all origins
app.use(cors());

require('dotenv').config();

const API_BASE_URL = 'https://search.censys.io/api/v2/hosts/search';

// Make sure your API ID and SECRET stored securely in environment variables
const API_ID = process.env.CENSYS_API_ID;
const API_SECRET = process.env.CENSYS_API_SECRET;

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.get("/api/fetchSearchResults", async (req, res) => {
    try {
        const credentials = btoa(`${API_ID}:${API_SECRET}`);

        const queryPattern = req.query.q;
        const perPage = req.query.per_page || 25;
        const virtualHosts = req.query.virtual_hosts || "EXCLUDE";
        const sort = req.query.sort || "RELEVANCE";
        const cursor = req.query.cursor || null;

        let reqBody = {
            q: queryPattern,
            per_page: perPage,
            virtual_hosts: virtualHosts,
            sort: sort,
        };

        if (cursor) {
            reqBody.cursor = cursor;
        }

        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        if (!response.ok) {
            throw new Error(`Error fetching search results: ${response.statusText}`);
        }

        const data = await response.json();

        res.json({
            results: data.result.hits.map((item) => ({
                ip: item.ip,
                protocols: item.services.map((item) => ({
                    transport: item.transport_protocol,
                    name: item.service_name,
                    port: item.port,
                })),
                // Map any additional fields here if needed
            })),
            nextPageToken: data.result.links.next,
            total: data.result.total,
        });
     } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data", error: error.message });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

// Catch-all handler for React routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});