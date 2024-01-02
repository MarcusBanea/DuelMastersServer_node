const Card = require('../models/card.model');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');
const fs = require('fs');

function getAllCards() {
    return Card.find({});
}

function getCardById(id) {
    const cardId = new mongoose.Types.ObjectId(id);
    return Card.findOne({_id: cardId});
}

function getCardByName(name) {
    return Card.findOne({name: name});
}

function getAllCardNames() {
    return Card.find({}).select({"_id": 0, "name": 1});
}

function getAllCardNamesWithRealm(realm) {
    return Card.find({realm: realm}).select({"_id": 0, "name": 1});
}

function getAllCardNamesWithRarity(rarity) {
    return Card.find({rarity: rarity}).select({"_id": 0, "name": 1});
}

function getAllCardNamesWithClass(cardClass) {
    return Card.find({cardClass: cardClass}).select({"_id": 0, "name": 1});
}

async function getCardImageByName(name) {
    let card = await Card.find({name: name}).select({'_id': 0, "imageId": 1});
    card = card[0];

    let image = testDownloadImage2(card.imageId);
    console.log(image);
}

async function getCardImageById(id) {
    let card = await Card.find({_id: id}).select({"imageId": 1, '_id': 0});
    card = card[0];

    let image = testDownloadImage2(card.imageId);
    console.log(image);

    // let image = downloadAndDecodeImage(card.imageId); 
    // return image;
}

function downloadAndDecodeImage(imageId, res) {
    
    const client = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");

    const db = client.db("DuelMasters");
    const bucket = new mongodb.GridFSBucket(db);

    const stream = bucket.openDownloadStream(new ObjectId(imageId));
    stream.read();

    const chunks = [];
    stream.on('data', data => {
        chunks.push(data);
        res.write(data);
    });
    stream.on('end', () => {
        const data = Buffer.concat(chunks);
        const bytes = Buffer.from(data).toString('base64');
    });
    stream.on('error', err => {
        console.error(err);
        return err;
    });
}


function testDownloadImage(imageId) {
    
    const client = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");

    const db = client.db("DuelMasters");
    const bucket = new mongodb.GridFSBucket(db);

    const stream = bucket.openDownloadStream(new ObjectId(imageId)).
        pipe(fs.createWriteStream('testImage.jpg')).
        on('error', function(error) {
            console.log("error!!");
        }).
        on('end', function() {
            console.log('Done!!');
            process.exit(0);
        });
    return stream;
}

function testDownloadImage2(imageId) {
    
    const client = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");

    const db = client.db("DuelMasters");
    const bucket = new mongodb.GridFSBucket(db);

    const stream = bucket.openDownloadStream(new ObjectId(imageId)).
        pipe(fs.createWriteStream('testImage.jpg')).
        on('error', function(error) {
            console.log("error!!");
        }).
        on('end', function() {
            console.log('Done!!');
            process.exit(0);
        });
}



function getAllCardNamesAndImageIds() {
    return Card.find({}).select({"_id": 0, "name": 1, "imageId": 1});
}

function getAllCardNamesAndRarities() {
    return Card.find({}).select({"_id": 0, "name": 1, "rarity": 1});
}

async function getRandomCardWithRarity(rarity) {
    return Card.aggregate([
        { $sample: {size: 1}},
        { $project: {_id: 1}},
    ]);
}

module.exports = {
    getCardImageByName, getCardImageById, getCardByName, getCardByName, getCardById, getAllCards,
    getAllCardNamesWithRealm, getAllCardNamesWithRarity, getAllCardNamesWithClass, getAllCardNamesAndRarities,
    getAllCardNamesAndImageIds, getAllCardNames, getRandomCardWithRarity
}