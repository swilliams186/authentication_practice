const { MongoClient, ObjectId } = require("mongodb");
//const uri = "mongodb://127.0.0.1:27017";
const { username, password, uri } = require(__dirname+"/logindata")

const client = new MongoClient(uri);
let database = "";
let collection = "";

exports.connect = async function (databaseName, collectionName) {

    
        try {
            await client.connect(uri);
            database = client.db(databaseName);
            collection = database.collection(collectionName);

            console.log("MongoDB connected to DB: " +databaseName+" and Collection: " + collectionName);
        } 
        catch(e){
            console.log("Error connecting\n"+e);
        }

}

exports.userExists = async function (username) {
    var foundUsers;
    
        try {
            //This returns a cursor that must be turned into an array
            foundUsers = await collection.countDocuments({username: username});
            console.log(foundUsers + " users found");
        } catch(e){
            console.log("Error finding user:\n"+e);
        }
    
    return foundUsers > 0;
}

exports.getUser = async function (username) {
    var foundUser;
    
        try {
            //This returns a cursor that must be turned into an array
            foundUser = await collection.find({username: username}).toArray();
            console.log(foundUser);
        } catch(e){
            console.log("Error finding user:\n"+e);
        }
    return foundUser;
}

exports.addUser = async function (username, password) {
        try {
            //This returns a cursor that must be turned into an array
            result = await collection.insertOne({username: username, password:password});
            console.log(result.insertedIs);


        } catch(e){
            console.log("Error adding user:\n"+e);
        }
}

exports.addItem = async function (listName, item){
        try {           
            //const result = await client.db("todolist").collection("work").insertOne({text: item});
            const result = await database.collection(listName).insertOne({text: item});
            console.log(result);
        } catch(error) {
        console.log("Error adding item to collection");
        console.log(error);
    };
}

exports.addMultipleItems = async function (listName, items){
    try {           
        //const result = await client.db("todolist").collection("work").insertOne({text: item});
        const result = await database.collection(listName).insertMany(items);
        console.log(result);
    } catch(error) {
    console.log("Error adding item to collection");
    console.log(error);
};
}

exports.removeItem = async function (listName, idToRemove){
    console.log("removing item");
    try {     
        // const result = await collection.deleteOne({_id: idToRemove});
        const x = new ObjectId(idToRemove);
        const result = await client.db("todolist").collection(listName).deleteOne({_id: x});

        console.log(result) ;
    } catch(error) {
    console.log("Error deleting item from collection");
    console.log(error);
    };
    
}
