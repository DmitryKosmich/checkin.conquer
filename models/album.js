'use strict';

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: false,
        required: false,
        default: 'no name'
    },
    FQUserId: {
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
    cc: {
        type: String,
        unique: false,
        required: false
    },
    city: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    previewSrc: {
        type: String,
        unique: false,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Album = mongoose.model('Album', schema);