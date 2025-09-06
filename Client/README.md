### Transaction Manager: Full-Stack Application

This document provides a comprehensive guide to setting up and running the Transaction Manager application, which consists of a backend API and a frontend application. The instructions are written for users with minimal prior experience with the frameworks and tools used.

---

### Prerequisites

To run this application, you must have the following software installed on your system. It is highly recommended to use the specified versions to avoid compatibility issues.

- **Node.js**: `v20.19.0` or higher (includes `npm`)

### Installation

Follow these steps to set up both the backend and frontend components of the application.

#### **Backend Setup**

1.  Navigate to the `backend` directory in your terminal or command prompt.
2.  Install the required Node.js packages by running the following command:
    `npm install`
3.  Set up the environment variables. Inside your Server folder, create another folder and name it `Data` then save the `transactions.csv` file inside. For the localhost, you can just run it when it is ready or set a specified port number in the index.js.

#### **Frontend Setup**

1.  Navigate to the `frontend` directory in your terminal.
2.  Install the Quasar CLI globally if you haven't already:
    `npm install -g @quasar/cli`
3.  Install the project-specific dependencies:
    `npm install`

---

### Running the Application

To run the full-stack application, you need to start both the backend API and the frontend development server.

1.  **Start the Backend API**:
    - Open a new terminal or command prompt window.
    - Navigate to the `backend` directory.
    - Run the start command:
      `npm start`
    - You should see a message in the console indicating that the server is running, usually on `http://localhost:3000`. This backend will now read from and write to the `transactions.csv` file to handle all data operations.

2.  **Start the Frontend Application**:
    - Open another new terminal or command prompt window.
    - Navigate to the `frontend` directory.
    - Start the Quasar development server:
      `quasar dev`
    - This command will compile the frontend code and automatically open the application in your default web browser, usually at `http://localhost:8080`.

---

### API Documentation

The backend API is designed to manage transactions and is a RESTful service. All requests and responses are in JSON format. The base URL for all endpoints is `http://localhost:3000/api`. The API directly interacts with the `transactions.csv` file for all data persistence.

#### **Endpoints**

- **GET `/api/transactions`**
  - **Description**: Retrieves a list of all transactions from the CSV file.
  - **Response**: `200 OK`
  - **Example**: `[{"Transaction Date": "08/23/2025", "Account Number" : "1213-1213-1213"}, ...]`

- **POST `/api/transactions`**
  - **Description**: Creates a new transaction and appends it to the CSV file.
  - **Request Body**: `{"amount": 100,}`
  - **Response**: `201 Created`
  - **Example**: `[{"Transaction Date": "08/6/2025", "Account Number" : "1213-1213-1213"}, ...]`

### Testing

The application's functionality can be tested through the user interface after running both the backend and frontend. You can perform actions like adding transactions even filters and mobile responsiveness to ensure the API and UI are working together correctly. You can also use a tool like Postman to test the backend API endpoints directly.
