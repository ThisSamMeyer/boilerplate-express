// Basic Node and Express

let express = require('express');
let app = express();

// #6a - Use the .env File
require('dotenv').config();

// #11a - Use body-parser to Parse POST Requests
let bodyParser = require('body-parser');

// #11b - Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false } ));

// #4 - Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

// #7 - Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    // #2 - Start a Working Express Server
    // res.send('Hello Express');

    // #3 - Serve an HTML File
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/json', (req, res) => {
    // res.json( { "message": "Hello json" } );  // #5 - Serve JSON on a Specific Route

    // #6b - Use the .env File
    if (process.env.MESSAGE_STYLE === "uppercase"){
        res.json({ "message": "Hello json".toUpperCase() });
    }else {
        res.json({ "message": "Hello json" });
    }
});

// #8 - Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json( { "time": req.time } );
});

// #9 - Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
    res.json( { "echo": req.params.word } );
});

// #10 - Get Query Parameter Input from the Client
app.get(`/name`, (req, res) => {
    let { first: firstName, last: lastName } = req.query;
    res.json( { "name": `${firstName} ${lastName}` } );
});

// #12 - Get Data from POST Requests
app.post('/name', (req, res) => {
    let { first: firstName, last: lastName } = req.body;
    res.json({ "name": `${firstName} ${lastName}` });
});

// #1 - Meet the Node Console
console.log("Hello World");

 module.exports = app;
