const mongoose = require("mongoose");
const { username } = require("./logindata");
const { mongooseuri } = require(__dirname+"/logindata");

mongoose.connect(mongooseuri);
const db = mongoose.connection;





//Schemas are the blueprint or datastructure of the data
const userSchema = new mongoose.Schema({
  username: String, //The extension that was requested eg /kittens
  password: String  //The text 
}); 

//First param is the name of the collection - always singular (mongoose will turn Fruit into Fruits)
//This creates the collection even if you never call .save() on a model!
//Model can then be used like a collection
const Users = mongoose.model("user", userSchema);

exports.userExists = userExists;
async function userExists(username){
    let resultCount = await Users.countDocuments({username: username});
    //console.log(resultCount);
    return resultCount > 0;
}

exports.addUser = addUser;
async function addUser(username, password){
    let user = new Users({
        username: username,
        password: password
    });

    await user.save();
}

exports.getUser = getUser;
async function getUser(username){
    console.log("USER: " + username);
    let result = await Users.find({username: username});
    console.log(result);
    return result;
}


db.on("error", console.error.bind(console, "connection error: "));  //Called if db connection errors

db.once("open", async function () {     //called if db.connection above promise resolves as open
  console.log("Connected successfully");
  await getUser("hel@lo.com");
});


