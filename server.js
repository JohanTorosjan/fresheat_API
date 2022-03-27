const express = require("express");

const app = express();


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FreshEat application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;



// My routes:
require("./routes/signup.route.js")(app);
require("./routes/login.route.js")(app);
require("./routes/name.route.js")(app);
require("./routes/receipe.route.js")(app);
require("./routes/order.route.js")(app);
require("./routes/cooker.route.js")(app);
require("./routes/message.route.js")(app);
require("./routes/switchbutton.route.js")(app);
require("./routes/friend.route.js")(app);

//// Run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});