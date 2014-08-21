var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongoose.uri, config.mongoose.options, function(err) {
    if (err) {
        console.error('MONGOOSE : CONNECTION ERROR');
        throw err;
    }
});
module.exports = mongoose;