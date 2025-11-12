# MERN Stack Integration Project

This project is a full-stack application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It features user authentication, post management, and category management.

## Features

-   User Registration and Login (JWT Authentication)
-   Create, Read, Update, Delete (CRUD) operations for Blog Posts
-   Create and List Categories for Posts

## Technologies Used

**Frontend (Client):**
-   React.js
-   Vite (for development and build)
-   Axios (for API requests)
-   React Router DOM (for navigation)
-   Tailwind CSS (for styling)

**Backend (Server):**
-   Node.js
-   Express.js (for building REST APIs)
-   MongoDB (NoSQL database)
-   Mongoose (ODM for MongoDB)
-   bcryptjs (for password hashing)
-   jsonwebtoken (for JWT authentication)
-   dotenv (for environment variables)
-   nodemon (for automatic server restarts during development)
-   express-validator (for request body validation)

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager)
-   MongoDB (running locally or accessible via a cloud service like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <repository_url>
cd mern-stack-integration-3ugenesGit
```

### 2. Backend Setup

Navigate to the `server` directory, install dependencies, and create a `.env` file.

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following content:

```
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET_KEY
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

-   Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB connection string (e.g., `mongodb://localhost:27017/mern_blog` or your MongoDB Atlas URI).
-   Replace `YOUR_JWT_SECRET_KEY` with a strong, random string for JWT signing.

### 3. Frontend Setup

Navigate to the `client` directory, install dependencies, and create a `.env` file.

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory with the following content:

```
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Running the Application

#### Start the Backend Server

In the `server` directory, run:

```bash
cd ../server
npm run dev
```

The server will start on `http://localhost:5000`.

#### Start the Frontend Development Server

In the `client` directory, run:

```bash
cd ../client
npm run dev
```

The client application will open in your browser, usually at `http://localhost:5173`.

## Usage

1.  **Register a new user** through the client application.
2.  **Log in** with your registered credentials.
3.  Once logged in, you can **create new categories** and **manage posts**.

## Seeding the Database (Optional)

The backend includes a seeding script to populate the database with dummy data.

To seed the database:

```bash
cd server
npm run seed
```

To destroy seeded data:

```bash
cd server
npm run seed:destroy
```