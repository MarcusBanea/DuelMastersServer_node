const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {type: String},
    length: {type: Number},
    chunkSize: {type: Number},
    metadata: {type: Object}
},
{ collection : 'fs.files' }
);

const FsFile = mongoose.model('FsFile', fileSchema);
module.exports = FsFile;