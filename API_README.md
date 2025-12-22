# Movie API Documentation

A comprehensive RESTful API for movie database management with JWT-based authentication.

## Overview

The Movie API provides a complete backend solution for managing movies, users, genres, and directors. It features secure user authentication, comprehensive CRUD operations, and detailed movie information management.

## Features

- **JWT Authentication**: Secure token-based authentication system
- **User Management**: Registration, profile management, and favorites
- **Movie Operations**: Full CRUD operations with search and filtering
- **Genre & Director Management**: Categorization and director information
- **Security**: Password hashing, input validation, and authorization

## API Endpoints

### Authentication
- `POST /login` - User login with JWT token generation

### Users
- `POST /users` - User registration
- `GET /users/:Username` - Get user profile (protected)
- `PUT /users/:Username` - Update user profile (protected)
- `DELETE /users/:Username` - Delete user account (protected)
- `POST /users/:Username/favorites/:MovieID` - Add movie to favorites (protected)
- `DELETE /users/:Username/favorites/:MovieID` - Remove movie from favorites (protected)

### Movies
- `GET /movies` - Get all movies (protected)
- `GET /movies/search?q=query` - Search movies by title (protected)
- `GET /movies/genre/:genre` - Filter movies by genre (protected)
- `GET /movies/director/:director` - Filter movies by director (protected)
- `GET /movies/year/:year` - Filter movies by year (protected)
- `GET /movies/:id` - Get single movie (protected)
- `POST /movies` - Create new movie (protected)
- `PUT /movies/:id` - Update movie (protected)
- `DELETE /movies/:id` - Delete movie (protected)

### Genres
- `GET /genres` - Get all genres
- `GET /genres/:id` - Get single genre
- `POST /genres` - Create new genre
- `PUT /genres/:id` - Update genre
- `DELETE /genres/:id` - Delete genre

### Directors
- `GET /directors` - Get all directors
- `GET /directors/:id` - Get single director
- `POST /directors` - Create new director
- `PUT /directors/:id` - Update director
- `DELETE /directors/:id` - Delete director

## Authentication

Most endpoints require JWT authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Data Formats

All requests and responses use JSON format. Ensure `Content-Type: application/json` header is included in POST/PUT requests.

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `.env` file
3. Start the server: `npm start`
4. The API will be available at `http://localhost:8080`

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (optional, defaults to 8080)

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport** - Authentication middleware
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT implementation