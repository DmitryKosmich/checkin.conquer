'use strict';

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    cc: {
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
    capital: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    region: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    subregion: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    population: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    area: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    gini: {
        type: String,
        unique: false,
        required: false,
        default: 'unknown'
    },
    flagSrc: {
        type: String,
        unique: false,
        required: false
    }
});

exports.Country = mongoose.model('Country', schema);