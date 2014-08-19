var Chat = require('../../models/chat').Chat;

exports.add = function(req, res) {
    var newChat = new Chat(req.body.chat);
    newChat.save(function(err, chat, affected) {
        if (err) {
            res.status(500);
            throw err;
        }else{
            res.send(chat);
        }
    });
};

exports.getOne = function(req, res) {
    Chat.findById(req.body.id, function(err, chat) {
        if (err) {
            res.status(500);
            res.end();
            throw err;
        }else{
            res.send(chat);
        }
    });
};

exports.getAll = function(req, res) {
    var resultChats = [];
    Chat.find({"from": req.body.FQUserId}, function(err, chats) {
        if (err) {
            res.status(500);
            res.end();
            throw err;
        }else{
            resultChats = chats;
            Chat.find({"to": req.body.FQUserId}, function(err, chats) {
                if (err) {
                    res.status(500);
                    res.end();
                    throw err;
                }else{
                    for(var index in chats){
                        resultChats.push(chats[index]);
                    }
                    res.send(resultChats);
                }
            });
        }
    });
};

exports.delete = function(req, res) {
    Chat.findByIdAndRemove(req.body.id, function(err, chat) {
        if (err) {
            res.status(500);
            res.end();
            throw err;
        }else{
            res.send(chat);
        }
    });
};

exports.search = function(req, res) {
    Chat.find(req.body.params, function(err, chats) {
        if (err) {
            res.status(500);
            res.end();
            throw err;
        }else{
            res.send(chats);
        }
    });
};

exports.update = function(req, res) {
    Chat.findByIdAndUpdate(req.body.id, req.body.chat, function(err, chat) {
        if (err) {
            res.status(500);
            res.end();
            throw err;
        }else{
            res.send(chat);
        }
    });
};