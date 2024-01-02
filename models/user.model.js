const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const userSchema = new Schema({
    _id: {type: ObjectId},
    username: {type: String},
    email: {type: String},
    nickname: {type: String},
    money: {type: Number},
    level: {type: Number},
    xp: {type: Number},
    collectionName: {type: Object}
},
{ collection : 'User' }
);

const User = mongoose.model('User', userSchema);
module.exports = User;