var Message = require('../../models/message').Message;

exports.add = function(req, res) {
    console.log(req.body.message);
    var newMessage = new Message(req.body.message);
    newMessage.save(function(err, message, affected) {
        if (err) {
            res.status(500);
            throw err;
        }else{
            res.send(message);
        }
    });
};

exports.getOne = function(req, res) {
    Message.findById(req.body.id, function(err, message) {
        if (err) {
            res.status(500);
            throw err;
        }else{
            res.send(message);
        }
    });
};

exports.getAll = function(req, res) {
    Message.find({"FQUserId": req.body.FQUserId}, function(err, messages) {
        if (err) {
            res.status(500);
            res.end();
            throw err;
        }else{
            res.send(messages);
        }
    });
};

exports.delete = function(req, res) {
    Message.findByIdAndRemove(req.body.id, function(err, message) {
        if (err) {
            res.status(500);
            throw err;
        }else{
            res.send(message);
        }
    });
};

exports.search = function(req, res) {
    Message.find(req.body.params, function(err, messages) {
        if (err) {
            res.status(500);
            throw err;
        }else{
            res.send(messages);
        }
    });
};


exports.getMany = function(req, res) {
    var messages = [];
    var transaction = function(index, messages, result, callback){
        Message.findById(messages[index], function(err, message) {
            if (err) {
                callback(err);
            }else{
                result.push(message);
                if(index+1 >= messages.length){
                    callback(null, result);
                }else{
                    transaction(++index, messages, result, callback);
                }
            }
        });
    };
    transaction(0, req.body.messages, messages, function(err, messages){
        if(err){
            res.status(500);
            res.end();
            throw err;
        }else{
            res.send(messages);
        }
    });
};