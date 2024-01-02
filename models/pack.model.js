const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const packSchema = new Schema({
    name: {type: String},
    totalNumberOfCards: {type: Number},
    price: {type: Number},
    numberOfCommonCards: {type: Number},
    numberOfUncommonCards: {type: Number},
    numberOfRareCards: {type: Number},
    numberOfVeryRareCards: {type: Number},
    numberOfSuperRareCards: {type: Number},
    numberOfLegendaryCards: {type: Number}
},
{ collection : 'Pack' }
);

const Pack = mongoose.model('Pack', packSchema);
module.exports = Pack;