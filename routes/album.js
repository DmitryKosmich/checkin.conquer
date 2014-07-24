var Album = require('../models/album').Album;

exports.get = function(req, res) {
    res.render('album');
};

exports.post = function(req, res) {
    res.render('album');
};

exports.add = function(req, res) {
    var newAlbum = new Album({
        "userId": req.body.album.userId,
        "userPicasaId": req.body.album.userPicasaId,
        "albumPicasaId": req.body.album.albumPicasaId,
        "countryCode": req.body.album.countryCode
    });
    Album.findOneAndRemove({"userId": newAlbum.userId, "countryCode": newAlbum.countryCode}, function(err, album) {
        if (err) throw err;
        newAlbum.save(function(err, album, affected) {
            if (err) throw err;
        });
    });
    res.send({"album": newAlbum});
};

exports.getOne = function(req, res) {
    Album.findOne({"userId": req.body.album.userId, "countryCode": req.body.album.countryCode}, function(err, album) {
        if (err) throw err;
        res.send({"album": album});
    });
};

exports.delete = function(req, res) {
    Album.findOneAndRemove({"userId": req.body.album.userId, "countryCode": req.body.album.countryCode}, function(err, album) {
        if (err) throw err;
        res.send({"album": album});
    });
};