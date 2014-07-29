var Album = require('../models/album').Album;

exports.get = function(req, res) {
    res.render('albums');
};

exports.post = function(req, res) {
    res.render('albums');
};

exports.getAll = function(req, res) {
    Album.find({"userId": req.body.album.userId, "countryCode": req.body.album.countryCode, "city": req.body.album.city}, function(err, albums) {
        if (err) throw err;
        res.send({"albums": albums});
    });
};