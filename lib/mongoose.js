var mongoose = require('mongoose');
var config = require('../config');

console.log('url: '+config.mongoose.uri);
console.log('options: '+JSON.stringify(config.mongoose.options));

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;