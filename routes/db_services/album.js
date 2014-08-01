var Album = require('../../models/album').Album;

exports.add = function(req, res) {
    var newAlbum = new Album(req.body.album);
    newAlbum.save(function(err, album, affected) {
        if (err) throw err;
        res.send(album);
    });
};

exports.getOne = function(req, res) {
    Album.findById(req.body.id, function(err, album) {
        if (err) throw err;
        res.send(album);
    });
};

exports.getAll = function(req, res) {
    Album.find({"userId": req.body.userId}, function(err, albums) {
        if (err) throw err;
        res.send(albums);
    });
};

exports.delete = function(req, res) {
    Album.findByIdAndRemove(req.body.id, function(err, album) {
        if (err) throw err;
        res.send(album);
    });
};

exports.search = function(req, res) {
    Album.find(req.body.params, function(err, albums) {
        if (err) throw err;
        res.send(albums);
    });
};

exports.update = function(req, res) {
    Album.findByIdAndUpdate(req.body.id, req.body.album, function(err, album) {
        if (err) throw err;
        res.send(album);
    });
};