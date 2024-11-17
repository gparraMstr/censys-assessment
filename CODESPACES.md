
# Testing the Application Using GitHub Codespaces

This document provides instructions for setting up and testing the application using GitHub Codespaces to run and test **Censys application**.

## Prerequisites

1. A GitHub account with access to the repository containing the application.
2. Codespaces enabled for your GitHub account or organization.

## Steps to Test the Application in Codespaces

### 1. Open the Repository in Codespaces
1. Navigate to the repository in GitHub.
2. Click the **Code** button, then select the **Codespaces** tab.
3. Click **New Codespace** to create a new development environment.

### 2. Initial Setup in Codespaces
Once the Codespace is ready:
1. Install all dependencies for both frontend and backend:
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```

2. Set Up Environment Variables
   Create the `.env` files for both the frontend and backend.

   - **Frontend** `.env` file (in the `root` folder):
      ```bash
      REACT_APP_CENSYS_PROXY_URL=http://localhost:5001/api/fetchSearchResults
      BUILD_PATH=./backend/build
      ```
      The frontend implementation will automatically detect if the application is running in a GitHub Codespace by checking environment variables (`CODESPACE_NAME`, `PORT`, and `GITHUB_CODESPACE_PORT_FORWARDING_DOMAIN`). And it will default to value specified in `REACT_APP_CENSYS_PROXY_URL` if unable to GitHub Codespace environment variables.

   - **Backend** `.env` file (in the `backend` folder):
      ```bash
      CENSYS_API_ID=your_api_id
      CENSYS_API_SECRET=your_api_secret
      CENSYS_API_URL=https://search.censys.io/api/v2/hosts/search
      ```

3. Build the frontend:
   ```bash
   npm run build
   ```

3. Start the application:
   ```bash
   cd backend
   node index.js
   or
   npm run start
   ```

4. Note the dynamically generated URL for the application. This will typically look like:
   ```
   https://<codespace-name>-5001.<your-codespace-domain>
   ```

### 3. Testing the Application
1. Open the dynamically generated URL in a browser.
2. Follow these steps in [How to Test](./README.md#how-to-test) section to test the application manually or follow these simpler steps:
   - Enter a search query in the text field.
   - Click the **Search** button.
   - Scroll through paginated results.
   - Click **Load More Results** to fetch additional data.
3. Observe the backend API proxy handling all requests securely.

### 4. Running Unit Tests
To run automated unit tests in the Codespace environment:
1. Run the test command:
   ```bash
   npm test
   ```

### 5. Additional Notes
- The application dynamically determines the Codespace URL for testing, ensuring compatibility with the environment.
- Environment variables such as `CENSYS_API_ID` and `CENSYS_API_SECRET` should be set securely in `.env` files before testing.

---

For any issues or questions, please refer to the main project documentation or contact the repository owner.
