
Movie API
=========

A simple REST API built with Node.js, Express, and MongoDB to provide information about movies, directors, and genres. It also allows users to register, log in, and manage their list of favorite movies.

Features
--------

- User registration and authentication (JWT)
- Get information about movies, genres, and directors
- Users can add or remove favorite movies
- Secure password storage using hashing
- MongoDB for database storage

Endpoints
---------

POST /users
  - Register a new user

POST /login
  - Log in and receive a JWT token

GET /movies
  - Get all movies

GET /movies/:title
  - Get a single movie by title

GET /movies/genre/:genreName
  - Get movies by genre

GET /movies/director/:directorName
  - Get movies by director

GET /users/:username
  - Get a user's profile

PUT /users/:username
  - Update a user's profile

POST /users/:username/movies/:movieId
  - Add a movie to user's favorites

DELETE /users/:username/movies/:movieId
  - Remove a movie from user's favorites

DELETE /users/:username
  - Delete a user account

Authentication
--------------

Some routes require a JWT token in the Authorization header:
Authorization: Bearer <token>

Installation
------------

1. Clone the repository
   git clone https://github.com/CreativeMarkus/movie_api.git
   cd movie_api

2. Install dependencies
   npm install

3. Configure environment variables
   Create a file named .env and add the following:

   PORT=8080
   DB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key

4. Start the server
   npm start

Future Improvements
-------------------

- Pagination for movie listings
- Input validation
- Rate limiting for security
- Deploy to a hosting platform

License
-------

This project is licensed under the MIT License.
