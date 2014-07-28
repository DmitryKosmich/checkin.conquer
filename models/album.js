
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: false,
        required: false
    },
    userId: {
        type: String,
        unique: false,
        required: true
    },
    userPicasaId: {
        type: String,
        unique: false,
        required: true
    },
    albumPicasaId: {
        type: String,
        unique: false,
        required: true
    },
    countryCode: {
        type: String,
        unique: false,
        required: true
    },
    city: {
        type: String,
        unique: false,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Album = mongoose.model('Album', schema);