const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser'); // middleware making object 
const {MongoClient} = require('mongodb');

app.use(cors()); // middleware 
app.use(bodyParser.json());

const uri = "mongodb+srv://devving:1234@cluster0.htfutxq.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri); // creating instance
const db = client.db("3102Final"); // referrencing db
async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        app.listen(5000,()=>{console.log("server started on port 5000")});
 
    } catch (e) {
        console.error(e);
    }
}

app.get("/api", async (req, res) =>{
    const data = await db.collection("notes").find().toArray();
    res.send(data);
});

app.post("/api/postData", async (req, res) => {
    const data = req?.body;
    const result = await db.collection("notes").insertOne(data);
    res.send(result);
})

app.post("/api/deleteData", async (req, res) => {
    const data = req?.body;
    const result = await db.collection("notes").deleteOne(data);
    res.send(result);
})

main().catch(console.error);


/*
1. require packages 
2. create mongo db connection
3. create get and post end point
*/
