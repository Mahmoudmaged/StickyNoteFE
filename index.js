// create node server

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");

//Users Apis Routes
var CitizenAPIs = require("./apis/UsersModuleAPIs/citizen");
var DoctorAPIs = require("./apis/UsersModuleAPIs/doctor");
var NotesAPIS = require("./apis/notes.api.js");
var AuthenticationAPIs = require("./apis/UsersModuleAPIs/authentication/signIn-signOut")
var session = require("express-session");
var uuid = require("uuid/v4");

// convert buffer data to json object with post requrests
app.use(express.json());
app.use(session({
    secret: "mysecret",
    genid: uuid,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cors({}));

const uri = "mongodb+srv://route:route@routedb-xy62x.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


CitizenAPIs(app);
DoctorAPIs(app);
AuthenticationAPIs(app);
NotesAPIS(app)

// awl api or awl endpoint
app.get("/", (req, resp) => {
    resp.send("server is running Route Egypt");
});


app.listen(process.env.PORT||3000); 