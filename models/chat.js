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
    from: {
        type:String,
        unique: false,
        required: true
    },
    to: {
        type: String,
        unique: false,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Chat = mongoose.model('Chat', schema);