var Country = require('../../models/country').Country;

exports.add = function(req, res) {
    var newCountry = new Country(req.body.country);
    Country.find({cc:newCountry.cc}, function(err, countries) {
        if (err) throw err;
        if(countries[0]==null){
            newCountry.save(function(err, country, affected) {
                if (err) throw err;
                res.send(country);
            });
        }else{
            res.send(countries[0]);
        }
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