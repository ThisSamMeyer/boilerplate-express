let express = require('express');
let app = express();
require('dotenv').config()

app.use("/public", express.static(__dirname + "/public"))

app.get('/', (req,res) => {
    // res.send('Hello Express')
    res.sendFile(__dirname + "/views/index.html")
})

app.get('/json', (req,res) => {
    if (process.env.MESSAGE_STYLE === "uppercase"){
        res.json({
            "message": "HELLO JSON".toUpperCase()
        })
    }else {
        res.json({
            "message": "Hello json"
        })
    }

})

console.log("Hello World")


































 module.exports = app;
