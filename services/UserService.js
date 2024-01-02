const User = require('../models/user.model');
const PackService = require('../services/PackService');
const { ObjectId } = require('mongodb');

function getUserBasicData(username) {
    return User.findOne({username: username});
}

function getUserCollection(username) {
    return User.findOne({username: username}).select({'_id': 0, 'collection': 1});
}

async function openPack(username, packName) {
    let user = new User();
    user = await User.findOne({username: username }).select({'_id': 0, 'money': 1});
    const pack = await PackService.getPackByName(packName);

    const allUsers = await User.find({}).select({"_id": 1});
    console.log(allUsers);

    user._id = "633f18459af2fa78268b91d4";
    if(user.money >= pack.price) {
        user.money -= pack.price;

        console.log("Can buy, enough money");

        const cards = PackService.openPack(pack);
        user = addCardsToCollection(user, cards);
        user.save();
        return cards;
    }
    return null;
}  


function addCardsToCollection(user, cardIds) {
    const currentCollection = user.collection;
    if(currentCollection != null) {
        for(let cardId in cardIds) {
            currentCollection.set(cardId, currentCollection.get(cardId) + 1);
        }
    }
    else {
        currentCollection = new Map();
        for(let cardId in cardIds) {
            if(currentCollection.has(cardId)) {
                currentCollection.set(cardId, currentCollection.get(cardId) + 1);
            }
            else {
                currentCollection.set(cardId, 1);
            }
        }
    }
    user.collection = currentCollection;
    return user;
}

module.exports = {getUserBasicData, getUserCollection, openPack};