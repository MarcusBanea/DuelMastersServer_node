const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const assert = require('assert');
const routes = require('../routes/routes');
const db = require('../db');
const { ObjectId, GridFSBucket } = require('mongodb');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://127.0.0.1:27017/";
// const client = new MongoClient(url);
// const database = "DuelMasters";

// app.get('/getBasicUserData', async (req, res) => {
//     let result = await client.connect();
//     let db = result.db(database);
//     let collectionUser = db.collection("User");
//     let query = {"username": req.query.name};
//     if((await collectionUser.countDocuments(query)) != 0) {
//         let response = collectionUser.find(query).project({nickname: 1, money: 1}).toArray();
//         res.send(await response);
//     }
//     else {
//         res.send({
//             message: "No document"
//         })
//     }
// })


// app.get('/getCard', async (req, res) => {

    
//     // //const MongoClient = require('mongodb').MongoClient;
//     // const url = "mongodb://127.0.0.1:27017/";
//     // const client = new mongodb.MongoClient(url);
//     // const database = "DuelMasters";

//     // client.connect(function (err) {
//     //     assert.ifError(err);

//     //     const db = client.db(database);
//     //     var bucket = new mongodb.GridFSBucket(db);
//     // })

    

//     const db = client.db(database);
//     const bucket = new mongodb.GridFSBucket(db);

//     const cursor = bucket.find({});
//     // let cards = [];
//     // while (await cursor.hasNext()) {
//     //     cards.push(await cursor.next());
//     // }

//     // console.log(cards[0]);

//     // let bucket = new mongodb.GridFSBucket(db, {
//     //     bucketName: 'files'
//     // });

//     let bufferArray = [];
//     var buffer;
//    let downloadStream = bucket.openDownloadStream(new ObjectId("6456985b6dc64a49ee6919fc"));
//     downloadStream.on('data', (chunk) => {
//         bufferArray.push(chunk);
//     })
//     downloadStream.on('end', function() {
//         buffer = Buffer.concat(bufferArray);
//         console.log(buffer);
//         //deferred.resolve(buffer);
//     })
//     //console.log(buffer);



//     //var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
//     //gridfs.

//     //let result = await client.connect();
//     // const db = client.db(database);
//     // const bucket = new GridFSBucket(db);

//     // let id = new ObjectId("6456985b6dc64a49ee6919fc");

//     // bucket.openDownloadStreamByName("Aeris, Flight Elemental.jpeg").pipe(res);
//     //bucket.openDownloadStream(id).pipe(res);

//     //console.log(bucket.find());
//     //let file = bucket.find().toArray();
//     //console.log(await file);

//     //bucket.openDownloadStream(new ObjectId("6456985b6dc64a49ee6919fc")).pipe(res);
//     //const readStream = fs.createReadStream();
//     //readStream.pipe(res);

//     res.send({message: "Works!"});
// })



// app.get('/getCard2', async (req, res) => {

//     const db = client.db(database);
//     const bucket = new mongodb.GridFSBucket(db);

//     const stream = bucket.openDownloadStream(new ObjectId("6456985b6dc64a49ee6919fc"));
//     //stream.read();
//     // res.send({msg: new Promise((resolve, reject) => {
//     //     const chunks = [];
//     //     stream.on('data', data => {
//     //         console.log(data);
//     //         chunks.push(data);
//     //     });
//     //     stream.on('end', () => {
//     //         const data = Buffer.concat(chunks);
//     //         resolve(data);
//     //     });
//     //     stream.on('error', err => {
//     //         reject(err);
//     //     });
//     // })});

//     // res.send({msg: () => {
//     //     const chunks = [];
//     //     stream.on('data', data => {
//     //         console.log(data);
//     //         chunks.push(data);
//     //     });
//     //     stream.on('end', () => {
//     //         const data = Buffer.concat(chunks);
//     //         return data;
//     //     });
//     //     stream.on('error', err => {
//     //         return err;
//     //     });
//     // }});
//     stream.pipe(res);
// })

//app.listen(process.env.PORT || 8081)
module.exports = app;