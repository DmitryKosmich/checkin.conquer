var Country = require('../models/country').Country;

exports.add = function(req, res) {
    var newCountry = new Country({
        code: req.body.country.code,
        userId: req.body.country.userId
    });
    Country.findOne({"code": newCountry.code, "userId": newCountry.userId}, function(err, country) {
        if(!country){
            newCountry.save(function(err, country, affected) {
                if (err) throw err;
            });
        }
    });

    res.render('index');
};

exports.delete = function(req, res) {
    Country.findOneAndRemove({"code": req.body.country.code, "userId": req.body.country.userId}, function(err, country) {
        if (err) throw err;
    });

    res.render('index');
};

exports.getOne = function(req, res) {
    Country.findOne({"code": req.body.country.code, "userId": req.body.country.userId}, function(err, country) {
        if (err) throw err;
        res.send(country);
    });
};

exports.all = function(req, res) {
    Country.find({"userId": req.body.userId}, function(err, countries) {
        if (err) throw err;
        res.send(countries);
    });
};