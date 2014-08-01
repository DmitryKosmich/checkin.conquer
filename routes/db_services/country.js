var Country = require('../../models/country').Country;

exports.add = function(req, res) {
    console.log(req.body.country);
    var newCountry = new Country(req.body.country);
    newCountry.save(function(err, country, affected) {
        if (err) throw err;
        res.send(country);
    });
};

exports.getOne = function(req, res) {
    Country.findById(req.body.id, function(err, country) {
        if (err) throw err;
        res.send(country);
    });
};

exports.getAll = function(req, res) {
    Country.find({}, function(err, countries) {
        if (err) throw err;
        res.send(countries);
    });
};

exports.delete = function(req, res) {
    Country.findByIdAndRemove(req.body.id, function(err, country) {
        if (err) throw err;
        res.send(country);
    });
};

exports.search = function(req, res) {
    Country.find(req.body.params, function(err, countries) {
        if (err) throw err;
        res.send(countries);
    });
};

exports.update = function(req, res) {
    Country.findByIdAndUpdate(req.body.id, req.body.country, function(err, country) {
        if (err) throw err;
        res.send(country);
    });
};