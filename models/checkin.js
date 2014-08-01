'use strict';

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: false,
        default: 'unknown'
    },
    address: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    city: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    FQUserId: {
        type: String,
        unique: false,
        required: true
    },
    FQCheckinId: {
        type: String,
        unique: false,
        required: false
    },
    cc: {
        type: String,
        unique: false,
        required: false
    },
    created: {
        type: String,
        unique: false,
        required: false
    },
    lat: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    lng: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    isFQ: {
        type: Boolean,
        unique: false,
        required: false,
        default: false
    }
});

exports.Checkin = mongoose.model('Checkin', schema);