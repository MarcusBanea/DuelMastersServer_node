const { ObjectId } = require('mongodb');
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const Pack = require('../models/pack.model');

exports.getAllPacks = asyncHandler(async (req, res, next) => {
    try {
        const pack = await Pack.find().select({"_id": 0, "name": 1, "price": 1, "numberOfCommonCards": 1, 
        "numberOfUncommonCards": 1, "numberOfRareCards": 1, "numberOfVeryRareCards": 1, 
        "numberOfSuperRareCards": 1, "numberOfLegendaryCards": 1});
        res.send(pack);
    }
    catch(err) {
        console.err(err);
        res.send(err);
    }
})
