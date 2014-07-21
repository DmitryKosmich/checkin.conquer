
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    code: {
        type: String,
        unique: false,
        required: true
    },
    userId: {
        type: String,
        unique: false,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Country = mongoose.model('Country', schema);