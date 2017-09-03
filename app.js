const http = require("http");
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const port = 9000;

// initalizing the app
const app = express();
// setting up the public folder

app.use(express.static(path.join(__dirname, 'public')))
    // setting up the view 
app.set('views', path.resolve(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// setting up the view engine
app.set("view engine", "ejs");

// create a global variable to hold our entries
const entries = [];
app.locals.entries = entries;

// using body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.render('index');
    // we render the homepage
});

app.get("/newpost", function(req, res) {
    res.render("newpost");
});

app.post("/newpost", function(req, res) {
    if (!req.body.title && !req.body.body) {
        res.send('all the fields are required');
        return;
    }
    entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});


http.createServer(app).listen(port, function() {
    console.log('server is running on port : ' + port);
});