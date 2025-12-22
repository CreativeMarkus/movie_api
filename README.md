# Movie API

A comprehensive RESTful API for managing movies and users, built with Node.js, Express, and MongoDB. This backend service provides JWT-based authentication, user management, and movie database operations with complete JSDoc documentation.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Documentation](#documentation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Management**: Registration, authentication, profile updates, and account deletion
- **Movie Database**: Complete CRUD operations for movies with detailed metadata
- **Favorites System**: Add/remove movies from user favorites
- **Director & Genre Management**: Organize movies by directors and genres
- **JWT Authentication**: Secure API access with JSON Web Tokens
- **Password Security**: bcrypt hashing for secure password storage
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing for web applications
- **Comprehensive Logging**: Request logging with Morgan middleware
- **Complete JSDoc Documentation**: Professional API documentation with examples
- **Search & Filtering**: Advanced movie search and filtering capabilities

---

## Prerequisites

- **Node.js** v14 or higher
- **npm** (Node Package Manager)
- **MongoDB** (local installation or cloud URI via MongoDB Atlas)
- **Git** for version control

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/CreativeMarkus/movie_api.git
cd movie_api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment file**

Create a `.env` file in the root directory:

```bash
cp .env.example .env  # If example exists, or create manually
```

4. **Configure environment variables**

Edit `.env` with your MongoDB connection string and JWT secret:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8080
```

---

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT token signing | Yes | `your_jwt_secret` |
| `PORT` | Server port | No | `8080` |

---

## Running the Server

### Development Mode
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production Mode
```bash
npm start    # Standard node server
```

The server will start on `http://localhost:8080` (or your specified PORT).

---

## API Endpoints

### Authentication
- `POST /login` - User login (returns JWT token)

### Users
- `POST /users` - Register new user
- `GET /users/:username` - Get user details (authenticated)
- `PUT /users/:username` - Update user information (authenticated)
- `DELETE /users/:username` - Delete user account (authenticated)
- `POST /users/:username/favorites/:movieId` - Add movie to favorites (authenticated)
- `DELETE /users/:username/favorites/:movieId` - Remove movie from favorites (authenticated)

### Movies
- `GET /movies` - Get all movies (authenticated)
- `GET /movies/:id` - Get specific movie by ID (authenticated)
- `GET /movies/search?q=query` - Search movies by title (authenticated)
- `GET /movies/genre/:genre` - Get movies by genre (authenticated)
- `GET /movies/director/:director` - Get movies by director (authenticated)
- `GET /movies/year/:year` - Get movies by year (authenticated)
- `POST /movies` - Add new movie (authenticated)
- `PUT /movies/:id` - Update movie (authenticated)
- `DELETE /movies/:id` - Delete movie (authenticated)

### Directors
- `GET /directors` - Get all directors
- `GET /directors/:id` - Get specific director
- `POST /directors` - Add new director
- `PUT /directors/:id` - Update director
- `DELETE /directors/:id` - Delete director

### Genres
- `GET /genres` - Get all genres
- `GET /genres/:id` - Get specific genre
- `POST /genres` - Add new genre
- `PUT /genres/:id` - Update genre
- `DELETE /genres/:id` - Delete genre

### Static Files
- `GET /` - Welcome message
- `GET /documentation` - API documentation (HTML)

---

## Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. Most endpoints require a valid JWT token.

### Getting a Token
1. Register a new user: `POST /users`
2. Login with credentials: `POST /login`
3. Use the returned token in subsequent requests

### Using the Token
Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Example Login Request
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{
    "Username": "testuser",
    "Password": "password123"
  }'
```

---

## Project Structure

```
movie_api/
├── models/                 # Mongoose schemas
│   ├── movies.js          # Movie model
│   ├── users.js           # User model
│   ├── directors.js       # Director model
│   └── genres.js          # Genre model
├── routes/                # Express route handlers
│   ├── movies.js          # Movie routes
│   ├── users.js           # User routes
│   ├── directors.js       # Director routes
│   └── genres.js          # Genre routes
├── public/                # Static files
│   ├── index.html         # Home page
│   └── documentation.html # API documentation
├── logs/                  # Log files
├── auth.js                # Authentication logic
├── passport.js            # Passport strategies
├── server.js              # Main server file
├── models.js              # Centralized models export
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── Procfile               # Heroku deployment config
└── README.md              # Project documentation
```

---

## Technologies Used

- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with JWT strategy
- **Password Hashing**: bcrypt
- **HTTP Logging**: Morgan
- **CORS**: cors middleware
- **Environment Variables**: dotenv
- **Development**: nodemon for auto-restart

---

## Deployment

### Heroku
This app is configured for Heroku deployment with the included `Procfile`.

1. **Create Heroku app**
```bash
heroku create your-app-name
```

2. **Set environment variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
```

3. **Deploy**
```bash
git push heroku main
```

### Other Platforms
The app can be deployed on any Node.js hosting platform. Ensure environment variables are properly configured.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

## Author

**CreativeMarkus** - [GitHub Profile](https://github.com/CreativeMarkus)

---

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/CreativeMarkus/movie_api/issues) on GitHub.
