const asyncHandler = require("express-async-handler");
const UserService = require('../services/UserService');

exports.getUserBasicData = asyncHandler(async (req, res, next) => {
    try {
        const user = await UserService.getUserBasicData(req.params.name);
        res.send(user);
    }
    catch(err) {
        console.err(err);
        res.send(err);
    }
})

exports.getUserCollection = asyncHandler(async (req, res, next) => {
    try {
        const user = await UserService.getUserCollection(req.params.username);
        res.send(user);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});


exports.openPack = asyncHandler(async (req, res, next) => {
    try {
        const user = null;
        await UserService.openPack(req.params.username, req.params.packType);
        res.send(user);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});