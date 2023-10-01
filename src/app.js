const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { ObjectId } = require('mongodb')

const app = express()
//print logs in a specific way
//app.use(morgan('combined'))
//allow the app to easily parse any json request sent in
app.use(bodyParser.json())
//allow any post/client to access this
app.use(cors())

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);
const database = "DuelMasters";

app.get('/testCard', async (req, res) => {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection("Cards");
    let response = await collection.findOne();
    res.send({
        message: "Test card: " + response.name
    })
});


app.get('/getUserById', async (req, res) => {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection("User");
    let _id = new ObjectId(req.query.id);
    let query = {"_id": _id};
    console.log(query);
    if((await collection.countDocuments(query)) != 0) {
        let response = collection.find(query).toArray();
        res.send(await response);
    }
    else {
        res.send({
            message: "No document"
        })
    }
});

app.get('/getUserByName', async (req, res) => {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection("User");
    let query = {"username": req.query.name};
    console.log("username = " + req.query.name);
    if((await collection.countDocuments(query)) != 0) {
        let response = collection.find(query).toArray();
        res.send(await response);
    }
    else {
        res.send({
            message: "No document"
        })
    }
});


app.get('/getCardByName', async (req, res) => {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection("Cards");
    let query = {"name": req.query.name};
    if((await collection.countDocuments(query)) != 0) {
        let response = collection.find(query).toArray();
        res.send(await response );
    }
    else {
        res.send({
            message: "No document"
        })
    }
})


app.get('/status', (req, res) => {
    res.send({
        message: "Hello there!"
    })
})

app.get('/getUserById', (req, res) => {
    res.send({
        message: `Test user: ${req.query.userId}` 
    })
})

app.listen(process.env.PORT || 8081)