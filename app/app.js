var express = require("express");
var https = require('https');
var fs = require('fs');
var bodyParser   = require('body-parser');
var path         = require('path');
var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PeerServer = require('peer').PeerServer;


// var login       = require("./routes/login.js");
// var home       = require("./routes/home.js");
var routes       = require("./routes/routes.js");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, room_code");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
app.use(session({
  secret: "n2qv",
  resave: true,
  saveUninitialized: true
}));
// override with POST having ?_method=PUT
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.resolve("..") +'/node_modules'));
app.use(express.static(path.join(__dirname, '/routes')));
app.use(express.static(path.join(__dirname, '/views')));
console.log(__dirname+'/node_modules')
console.log(path.resolve("..") + '/node_modules');
// app.use("/", login);
// app.use("/home", home);
app.use("/", routes);

// app.listen(3004, function() {
//   console.log("client listen on 3004");
// })

https.createServer({
	key : fs.readFileSync("server.key"),
	cert: fs.readFileSync("server.crt")},
	app)
.listen(3004, function() {
	console.log("client listen on 3004");
});