
# Steps to Start and Test the Censys Search Application

This document provides a quick and clear steps to successfully **start and test the application** based on the provided **[README.md](./README.md)**, which provides comprehensive details on installation, configuration, starting/testing the **Censys Search application**, and the design and architecture for both the frontend and backend proxy implementations.

---

## **1. Validate Prerequisites**
Ensure the following requirements are met:
- **Node.js**: Install version `18.15.x` or later.
- **npm**: Version `9.x` or later.
- **`pkg`**: Install globally for packaging (`npm install -g pkg`).
- **Censys API credentials**:
  - `CENSYS_API_ID` and `CENSYS_API_SECRET`.

---

## **2. Clone the Repository**
Run:
```bash
git clone https://github.com/gparraMstr/censys-assessment.git
cd censys-assessment
```

---

## **3. Install Dependencies**
- **Frontend**:
  ```bash
  npm install
  ```
- **Backend**:
  ```bash
  cd backend
  npm install
  ```

---

## **4. Set Up Environment Variables**
Create `.env` files in the required locations:

### **Frontend `.env`**
In the root directory, create a `.env` file with:
```plaintext
REACT_APP_CENSYS_PROXY_URL=http://localhost:5001/api/fetchSearchResults
BUILD_PATH=./backend/build
```

### **Backend `.env`**
In the `backend` directory, create a `.env` file as shown below. The values for `CENSYS_API_ID` and `CENSYS_API_SECRET` variables are obtained as indicated in [Prerequisites](./README.md#prerequisites) section.

```plaintext
CENSYS_API_ID=your_api_id
CENSYS_API_SECRET=your_api_secret
CENSYS_API_URL=https://search.censys.io/api/v2/hosts/search
```

---

## **5. Build the Frontend Application**
Switch to the frontend directory and build the application:
```bash
npm run build
```
Ensure the compiled files are placed in `backend/build/`.

---

## **6. Start the Application**

### **Run in Production Mode**
1. Start both frontend and backend applications as a combined Node.js service:
   ```bash
   cd backend
   node index.js
   or
   npm run start
   ```
2. Open the application in your browser:
   ```
   http://localhost:5001
   ```

---

## **7. Testing the Application**
### **Unit Testing**
1. Ensure the frontend application is built.
2. Run unit tests:
   ```bash
   npm test
   ```
3. View results for all tested components and utilities.

### **Manual Testing**
1. Access the application in the browser at`http://localhost:5001`.
2. Perform the following actions:
   - Enter a valid search query in the **SearchBar** (e.g., `services.http.response.headers.location=/.*(\.\.\/)+.*(\.asp|\.php|\.js|\.cgi).*/`).
   - Click the **Search** button.
   - Observe the results in the **ResultList**.
   - Scroll down and click the **Load More Results** button.
   - Ensure new results are appended to the existing list.

---

## **8. Optional: Create a Stand-Alone Executable**
1. Package the application into an executable:
   ```bash
   cd backend
   pkg .
   ```
2. Run the generated executable for your operating system:
   ```bash
   ./backend-macos  # Example for MacOS
   ```
3. Open the application in your browser:
   ```
   http://localhost:5001
   ```

---

## **Summary of Testing Steps**
- **Unit Test**: `npm test`.
- **Manual Test**: Start the application, search for IPv4 hosts, and test features like results display and pagination.

By following these steps, you can successfully start, test, and validate the application.
