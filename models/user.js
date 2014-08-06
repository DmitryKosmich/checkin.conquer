'use strict';

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    FQUserId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    surname: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    homeCity: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    avatarSrc: {
        type: String,
        unique: false,
        required: false
    },
    email: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    friends: {
        type: [String], //FQUserIds
        unique: false,
        required: false
    },
    lastUpdate: {
        type: String,
        unique: false,
        required: false,
        default: '0'
    }
});

exports.User = mongoose.model('User', schema);