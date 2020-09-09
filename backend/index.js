const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});



const { add, get } = require('./services/cache-service')


app.post("/register-session", (req, res) => {
        const chat = get(req.body.tkn) || [];
        const msg = { date: new Date(), message: "Opening Session", from: "app" }
        chat.push(msg);
        add(req.body.tkn, chat)
        res.json(chat);

});

app.post("/chat", (req, res) => {
        const chat = get(req.body.tkn)
        res.json(chat);

});



app.post("/store-message", (req, res) => {

        const chat = get(req.body.tkn);
        const msg = { date: new Date(), message: req.body.message, from: req.body.from }
        chat.push(msg);
        add(req.body.tkn, chat)
        res.json(chat);
});



const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));