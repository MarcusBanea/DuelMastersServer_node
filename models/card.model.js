const { ObjectId } = require('bson');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: {type: String},
    realm: {type: String},
    cardClass: {type: String},
    mana: {type: String},
    power: {type: String},
    rarity: {type: String},
    ability: {type: Array},
    attackProperty: {type: Array},
    blockProperty: {type: Array},
    type: {type: Array},
    placement: {type: Array},
    endOfTurn: {type: Array},
    addedPower: {type: Array},
    imageId: {type: String},
    _class: {type: String}
},
{collection: "Cards"}
);

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;