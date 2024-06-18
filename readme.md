# Blog Management System

This project is a Blog Management System built using Node.js, Express, and MongoDB. It provides functionalities for user authentication, blog management, and category management.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Seeding the Database](#seeding-the-database)

## Installation

1. Initialize the project:
    ```bash
    npm init -y
    ```

2. Install the required dependencies:
    ```bash
    npm install express mongoose dotenv morgan cookie-parser cors
    ```

3. Install development dependencies:
    ```bash
    npm install --save-dev nodemon
    ```

4. Create a `.gitignore` file and add `node_modules` to it:
    ```plaintext
    node_modules
    ```

5. Create an `index.js` file and set up the server (see below for details).

## Running the Application

To run the application in development mode, use:
```bash
npm run dev
To run the application in production mode, use:

npm start
Update the scripts section in package.json:

"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
Environment Variables
Create a .env file in the root directory and add the following environment variables:

PORT=8000
DB_URL=your_mongodb_connection_string
COOKIE_SECRET=your_cookie_secret
NODE_ENV=development
Project Structure
backend-sir/
├── modules/
│   ├── blogs/
│   │   ├── blog.controller.js
│   │   ├── blog.model.js
│   │   └── blog.route.js
│   ├── users/
│   │   ├── user.controller.js
│   │   ├── user.model.js
│   │   └── user.route.js
├── routes/
│   └── index.js
├── seed/
│   └── index.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
API Endpoints
User Routes
Register User: POST /api/v1/users/register
Login User: POST /api/v1/users/login
Get User by ID: GET /api/v1/users/:id
Update User: PUT /api/v1/users/:id
Delete User: DELETE /api/v1/users/:id
Blog Routes
Create Blog: POST /api/v1/blogs
Get Blogs: GET /api/v1/blogs
Get Blog by ID: GET /api/v1/blogs/:id
Update Blog: PUT /api/v1/blogs/:id
Delete Blog: DELETE /api/v1/blogs/:id
Miscellaneous Routes
Server Wakeup: GET /server-wakeup
Seeding the Database
To seed the database with initial data, run the following command:

node seed/index.js
This will connect to the MongoDB database and populate it with sample blog data.

Logging
The application uses morgan for logging HTTP requests. Logs are displayed in the console.

Middleware
CORS: Configured to allow requests from specific origins.
Cookie Parser: Used to parse cookies in the request.
JSON Parsing: Configured to parse JSON request bodies.
Error Handling
Errors are caught and returned as JSON responses with a status code of 500.

License
This project is licensed under the MIT License.