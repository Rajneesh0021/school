# school

This project provides a simple API for managing schools and retrieving them based on proximity to a user-specified location. It is built using Node.js, Express.js, and MySQL. The API allows users to add new schools and retrieve a list of schools sorted by distance from a given latitude and longitude.

## Features
Add School API: Add a new school to the database.  <br/>
List Schools API: Retrieve a list of schools sorted by proximity to the user's location using latitude and longitude.

## Technologies Used
Node.js: JavaScript runtime for building the backend.  <br/>
Express.js: Web framework for handling routes and API logic.  <br/>
MySQL: Relational database for storing school data.  <br/>
Body-parser: Middleware to parse incoming request bodies.  <br/>

## Prerequisites
Before running the project, ensure you have the following installed:
### Node.js
### MySQL 

## Database Setup
Create a MySQL database for the project.
Create the schools table using the following SQL command:
````
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
````
Update the MySQL connection settings in db.js with your own database credentials:

````
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name'
});
````

## Getting Started

### Clone the repository:
```
git clone https://github.com/Rajneesh0021/school.git
```
cd school 


### Install the dependencies:

```
npm install
``` 
### Run the application:

```
npm run server

```
The server will run on http://localhost:3000.

# API Endpoints

## 1. Add School 
Endpoint: /api/addSchool  <br/>
Method: POST  <br/>
Description: Adds a new school to the database.
### Request Body
```
{
  "name": "School Name",
  "address": "123 Main St",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```
### Example Request
```
curl -X POST http://localhost:3000/schools/addSchool \
-H "Content-Type: application/json" \
-d '{"name": "ABC School", "address": "123 Main St", "latitude": 37.7749, "longitude": -122.4194}'
```
### Example Response

```
{
  "message": "School added successfully",
  "schoolId": 1
}
```

## 2. List Schools by Proximity. 
Endpoint: /api/getSchools  <br/>
Method: GET  <br/>
Description: Fetches all schools from the database and sorts them by proximity to the user's location.

### Query Parameters
latitude: User's latitude (e.g., 37.7749)  <br/>
longitude: User's longitude (e.g., -122.4194)

### Example Request 
```
curl "http://localhost:3000/schools/listSchools?latitude=37.7749&longitude=-122.4194"
```

### Example Response
```
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 Main St",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "distance": 0
  },
  {
    "id": 2,
    "name": "XYZ School",
    "address": "456 Maple Ave",
    "latitude": 37.7849,
    "longitude": -122.4294,
    "distance": 1.2
  }
]
```
## Utilities
Distance Calculation  <br/>
The API uses the Haversine formula to calculate the distance between two geographical points (latitude and longitude). This formula is implemented in the schoolRoutes.js file.
