The project folder is named: movie_api

It includes:
MongoDB database with movies and users collections
Embedded documents for genre and director
Referenced ObjectIDs for users’ favorite movies
Sample CRUD operations (READ, UPDATE, DELETE) as terminal commands and screenshots

Folder Contents
movie_api/
├── movies.json – Exported MongoDB movies collection
├── users.json – Exported MongoDB users collection
├── screenshots/ – Terminal screenshots of queries and results
├── documentation.html – API endpoint references from Exercise 2.5
└── README.md – This file

Collections & Structure
Movies Collection
Each movie document includes:

Title (String)
Description (String)
Genre (Embedded Document)
Director (Embedded Document)
ImagePath (String)
Featured (Boolean)

Includes 10+ movies
At least 2 movies share a director
At least 2 share a genre
Format is consistent and clean

Users Collection
Each user document includes:
Username (String)
Password (String)
Email (String)
Birthday (Date, e.g. new Date("1985-02-19"))

FavoriteMovies (Array of ObjectId references)
Includes 5+ users
Favorite movies stored as references
Proper use of data types

CRUD Queries
READ
Get movie by Title 123456

Find movies by Genre.Name
Find movies by both Genre.Name and Director.Name

UPDATE
Change a movie’s Description
Update a Director’s Bio across multiple movies
Add a movie to a user’s FavoriteMovies

DELETE
Delete a user by Username

Screenshots are located in the /screenshots folder
Final READ query confirms updates/deletion

Using the Database
MongoDB Import
To load the data into MongoDB:

mongoimport --db movie_api --collection movies --file movies.json --jsonArray
mongoimport --db movie_api --collection users --file users.json --jsonArray
Then start Mongo shell:

mongosh
use movie_api
API Endpoints (from documentation.html)
GET /movies – List all movies

GET /movies/:title – Get movie by title
GET /genres/:name – Get genre info by name
GET /directors/:name – Get director info by name
POST /users/:username/movies/:movieID – Add movie to favorites
DELETE /users/:username/movies/:movieID – Remove movie from favorites
DELETE /users/:username – Deregister user

Notes
This project demonstrates the use of MongoDB document structures and relationships using both embedded documents and references. It supports scalable, flexible, NoSQL-style data storage while maintaining uniform schema through proper structure and conventions.

License
For academic and instructional use only.