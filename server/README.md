# Backend Server

This is the Express.js backend for the Farmers Market App.

## Prerequisites

- Node.js (v18 or higher)

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Initialize Database**:
    This will create the SQLite database file (`dev.db`).
    ```bash
    npm run db:push
    ```

3.  **Seed Database** (Optional):
    Populate the database with initial data.
    ```bash
    npm run db:seed
    ```

## Running the Server

-   **Development Mode** (auto-reloads):
    ```bash
    npm run dev
    ```

-   **Production Mode**:
    ```bash
    npm start
    ```

The server runs on `http://localhost:3000` by default.
