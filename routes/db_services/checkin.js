var Checkin = require('../../models/checkin').Checkin;

exports.add = function(req, res) {
    var newCheckin = new Checkin(req.body.checkin);
    newCheckin.save(function(err, checkin, affected) {
        if (err) {
            res.statusCode(500);
            res.end();
            throw err;
        }else{
            res.send(checkin);
        }
    });
};

exports.getOne = function(req, res) {
    Checkin.findById(req.body.id, function(err, checkin) {
        if (err) {
            res.statusCode(500);
            res.end();
            throw err;
        }else{
            res.send(checkin);
        }
    });
};

exports.getAll = function(req, res) {
    Checkin.find({"FQUserId": req.body.FQUserId}, function(err, checkins) {
        if (err) {
            res.statusCode(500);
            res.end();
            throw err;
        }else{
            res.send(checkins);
        }
    });
};

exports.delete = function(req, res) {
    Checkin.findByIdAndRemove(req.body.id, function(err, checkin) {
        if (err) {
            res.statusCode(500);
            res.end();
            throw err;
        }else{
            res.send(checkin);
        }
    });
};

exports.search = function(req, res) {
    Checkin.find(req.body.params, function(err, checkins) {
        if (err) {
            res.statusCode(500);
            res.end();
            throw err;
        }else{
            res.send(checkins);
        }
    });
};

exports.update = function(req, res) {
    Checkin.findByIdAndUpdate(req.body.id, req.body.checkin, function(err, checkin) {
        if (err) {
            res.statusCode(500);
            res.end();
            throw err;
        }else{
            res.send(checkin);
        }
    });
};