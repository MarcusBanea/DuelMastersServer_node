const asyncHandler = require("express-async-handler");
const CardService = require('../services/CardService');

const mongodb = require('mongodb');
const { ObjectId } = require("bson");
const Card = require("../models/card.model");

exports.getAllCards = asyncHandler(async (req, res, next) => {
    try {
        const cards = await CardService.getAllCards();
        res.send(cards);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardById = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getCardById(req.params.id);
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardByName = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getCardByName(req.params.name);
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardsNames = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getAllCardNames();
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardsByRealm = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getAllCardNamesWithRealm(req.params.realm);
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardsByRarity = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getAllCardNamesWithRarity(req.params.rarity);
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardsByCardClass = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getAllCardNamesWithClass(req.params.cardClass);
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardImageByName = asyncHandler(async (req, res, next) => {
    try {
        let cardImage = await CardService.getCardImageByName(req.params.name);
        res.send(cardImage);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardsWithImage = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getAllCardNamesAndImageIds();
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCollectionCards = asyncHandler(async (req, res, next) => {
    try {
        const card = await CardService.getAllCardNamesAndRarities();
        res.send(card);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardImageByCardId = asyncHandler(async (req, res, next) => {
    try {
        let cardImage = await CardService.getCardImageById(req.params.id);
        res.send(cardImage); 
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

exports.getCardImageByCardId2 = asyncHandler(async (req, res, next) => {
    try {
        console.log("wow! " + req.params.id + "\n");

        let card = await Card.find({_id: req.params.id}).select({"imageId": 1, '_id': 0});
        card = card[0];

        const client = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");

        const db = client.db("DuelMasters");
        let bucket = new mongodb.GridFSBucket(db);
        let downloadStream = bucket.openDownloadStream(new ObjectId(card.imageId));
        
        const chunks = [];
        downloadStream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        });

        downloadStream.on('end', () => {
            const data = Buffer.concat(chunks);
            const bytes = Buffer.from(data).toString('base64');
            res.write(bytes);
            res.end();
        });

    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});