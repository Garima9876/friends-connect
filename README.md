# Friends Connect

A social network application for managing friendships, sending and accepting friend requests, and discovering new connections.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) for managing packages

### Installation

1. **Clone the Repository**

   Clone the repository from GitHub:

   ```bash
   git clone https://github.com/Garima9876/blogflow.git
   cd server
   ```

2. **Install Dependencies**

   Install the required dependencies using npm or Yarn:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the Server**

   Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn run dev
   ```

   The server will start on port 5001. You can access the API endpoints by visiting `http://localhost:5001` in your web browser.

## API Endpoints

The following API endpoints are available:

* **GET /posts**: Retrieves a list of all blog posts
* **GET /posts/:id**: Retrieves a single blog post by ID
* **POST /posts**: Creates a new blog post
* **PUT /posts/:id**: Updates a single blog post by ID
* **DELETE /posts/:id**: Deletes a single blog post by ID


## Deployment

You can view the deployed app at https://friends-connect.vercel.app/.

## License

This project is licensed under the MIT License.
