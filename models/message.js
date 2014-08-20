'use strict';

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    chatId: {
        type:String,
        unique: false,
        required: true
    },
    body: {
        type:String,
        unique: false,
        required: true
    },
    author: {
        type: String,
        unique: false,
        required: true
    },
    created: {
        type: String,
        default: '0'
    }
});

exports.Message = mongoose.model('Message', schema);