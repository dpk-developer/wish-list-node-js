const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const portNumber = process.env.PORT || 8080;

/***** Serving Static / Local Files Middleware *****/
app.use(express.static("public"));

require('./models/wish');

/***** Middleware Body Parser for getting data in POST from client side *****/
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-Urlencoded
app.use(bodyParser.json()); // Parse application/json

require('./routes')(app);

/***** Initialize View Engine for Client Side *****/
app.set('view engine', 'ejs');

app.listen(portNumber, () => {
    console.log("Server is Running... on Port Number: " + portNumber);
})