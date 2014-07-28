var Album = require('../models/album').Album;

exports.get = function(req, res) {
    res.render('album');
};

exports.post = function(req, res) {
    res.render('album');
};

exports.add = function(req, res) {
    var newAlbum = new Album({
        "name": req.body.album.name,
        "userId": req.body.album.userId,
        "userPicasaId": req.body.album.userPicasaId,
        "albumPicasaId": req.body.album.albumPicasaId,
        "countryCode": req.body.album.countryCode,
        "city": req.body.album.city
    });
    console.log(newAlbum);
    newAlbum.save(function(err, album, affected) {
        if (err) throw err;
    });
    res.send({"album": newAlbum});
};

exports.getOne = function(req, res) {
    Album.findById(req.body.id, function(err, album) {
        if (err) throw err;
        res.send({"album": album});
    });
};

exports.delete = function(req, res) {
    Album.findByIdAndRemove(req.body.id, function(err, album) {
        if (err) throw err;
        res.send({"album": album});
    });
};