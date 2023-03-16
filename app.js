//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require ("ejs");
const db = require(__dirname+ "/mongoDB.js")
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));


app.listen(3000, function(){
    console.log("Server started on port 3000");
    db.connect("secrets", "users");
});

//HOME RENDER
app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login", {
        statusText: ""
    });  
});

app.post("/login", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    statusText = "";

    const result = await db.getUser(username);
    console.log(result);

    if(result.length > 0 && result[0].password == password){
        res.render("secrets");     
    }
    if (result.length == 0){
        statusText = "Username not found";
    }else{
        statusText = "Incorrect password";
    }
    res.render("login",{
        statusText: statusText
    });
    
});


app.get("/register", function(req, res){
    res.render("register",{
        statusText: ""
    });
});

app.post("/register", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    statusText = "";
    if(!await db.userExists(username)){
        db.addUser(username, password);
    }else{
        statusText = "Username already exists"
    }
    
    res.render("register",{
        statusText: statusText
    });
});
