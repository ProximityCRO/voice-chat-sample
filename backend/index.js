const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const sessionStore = require('./services/cache-service')


app.post("/register-session", (req, res) => {
        sessionStore.add( "tkn", req.body.tkn )
});



app.post("/store-message", (req, res) => {


});



const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));