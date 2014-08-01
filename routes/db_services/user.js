var User = require('../../models/user').User;

exports.add = function(req, res) {
    var newUser = new User(req.body.user);
    newUser.save(function(err, user, affected) {
        if (err) throw err;
        res.send(user);
    });
};

exports.getOne = function(req, res) {
    User.findById(req.body.id, function(err, user) {
        if (err) throw err;
        res.send(user);
    });
};

exports.getAll = function(req, res) {
    User.find({}, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
};

exports.delete = function(req, res) {
    User.findByIdAndRemove(req.body.id, function(err, user) {
        if (err) throw err;
        res.send(user);
    });
};

exports.search = function(req, res) {
    User.find(req.body.params, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
};

exports.update = function(req, res) {
    User.findByIdAndUpdate(req.body.id, req.body.user, function(err, user) {
        if (err) throw err;
        res.send(user);
    });
};