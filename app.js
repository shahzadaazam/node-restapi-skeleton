const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');


app.use(morgan('combined'));
app.use(express.json());

//To allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Update the following with your database credentials:
const connection = mysql.createConnection({
    host: 'localhost',
    user: '{your db username here}',
    password: '{your db password here}',
    database: '{your db name here}',
});

app.get("/", (req, res) => {
    console.log("Responding to root route");
    res.json("Server running");
});

//Persons route
app.get("/persons", (req, res) => {
    console.log("Responding to accident route");

    var queryParameter = req.query;
    console.log(queryParameter);

    //Update the following with your table name
    var queryString = "SELECT * FROM persons";

    connection.query(queryString, (err, rows, fields) => {

        console.log(queryString);
        //TODO: handle error and send 500 response back
        console.log("fetched persons");
        res.json(rows);
    });
})

//Update the following with your server port number
app.listen(3003, () => {
    console.log('Server listening');
})