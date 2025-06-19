The project folder is named: **`movie_api`**

It includes:
- MongoDB database with `movies` and `users` collections
- Embedded documents for `genre` and `director`
- Referenced ObjectIDs for users’ favorite movies
- Sample CRUD operations (READ, UPDATE, DELETE) as terminal commands and screenshots

movie_api/
├── movies.json # Exported MongoDB movies collection
├── users.json # Exported MongoDB users collection
├── screenshots/ # Terminal screenshots of queries and results
├── documentation.html # API endpoint references from Exercise 2.5
└── README.md # This file


---

Collections & Structure
Movies Collection

Each movie document includes:
- `Title`: *String*
- `Description`: *String*
- `Genre`: *Embedded Document*
- `Director`: *Embedded Document*
- `ImagePath`: *String*
- `Featured`: *Boolean*

Includes 10+ movies  
At least 2 movies share a director  
At least 2 share a genre  
Format is consistent and clean

Users Collection

Each user document includes:
- `Username`: *String*
- `Password`: *String*
- `Email`: *String*
- `Birthday`: *Date* (e.g. `new Date("1985-02-19")`)
- `FavoriteMovies`: *Array of ObjectId references*

Includes 5+ users  
Favorite movies stored as references  
Proper use of data types

---

CRUD Queries (Screenshots Included)

READ
1. Get movie by `Title`
2. Find movies by `Genre.Name`
3. Find movies by both `Genre.Name` and `Director.Name`

UPDATE
1. Change a movie’s `Description`
2. Update a `Director`’s `Bio` across multiple movies
3. Add a movie to a user’s `FavoriteMovies`

DELETE
- Delete a user by `Username`

Final `READ` query confirms updates/deletion

---

Using the Database
MongoDB Import

If you want to load the data into your own MongoDB instance:

```bash
mongoimport --db myflixdb --collection movies --file movies.json --jsonArray
mongoimport --db myflixdb --collection users --file users.json --jsonArray