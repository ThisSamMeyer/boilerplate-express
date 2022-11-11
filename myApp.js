let express = require('express')
let app = express()
require('dotenv').config()

app.use("/public", express.static(__dirname + "/public"))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})

app.get('/', (req, res) => {
    // res.send('Hello Express')
    res.sendFile(__dirname + "/views/index.html")
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json( { "time": req.time } );
});

app.get('/:word/echo', (req, res) => {
    res.json( {"echo": req.params.word});
});

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase"){
        res.json({
            "message": "Hello json".toUpperCase()
        })
    }else {
        res.json({
            "message": "Hello json"
        })
    }
})

console.log("Hello World");

 module.exports = app;
