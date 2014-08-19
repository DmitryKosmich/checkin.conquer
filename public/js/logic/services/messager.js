
var MESSAGER = (function(){
    'use strict';

    function findChat(params, callback){
        DB.chat.search(params, function(err, chats){
            ERROR.errorWrapper(err, chats, function(chats){
                if(chats){
                    callback(chats[0]);
                }else{
                    callback(null);
                }
            });
        });
    }

    function createChat(chat, callback) {
        DB.chat.add(chat, function(err, chat){
            if(err){
                ALERT.show("Adding chat", ALERT_TYPE.DANGER);
            }else{
                callback(chat);
            }
        });
    }

    return {

        getChat: function(FQUserId, callback){

            findChat({from:  SESSION.get("currentUserId"), to: FQUserId}, function(chat){
                if(chat){
                    callback(chat);
                }else{
                    findChat({from: FQUserId , to: SESSION.get("currentUserId")},function(chat){
                        if(chat){
                            callback(chat);
                        }else{
                            createChat({from:  SESSION.get("currentUserId"), to: FQUserId}, callback);
                        }
                    });
                }
            });
        },

        send: function(text, chat, callback){
            var message = {
                author: SESSION.get("currentUserId"),
                body: text,
                created: new Date().getTime()
            };
            DB.message.add(message, function(err, message){
                if(err){
                   ALERT.show("Adding message", ALERT_TYPE.DANGER);
                }else{
                    var id = chat._id;
                    delete chat._id;
                    delete chat.__v;
                    chat.messages.push(message._id);
                    DB.chat.update(id, chat, function(err, chat){
                        if(err){
                            ALERT.show("Updating chat", ALERT_TYPE.DANGER);
                        }else{
                            callback(chat);
                        }
                    });
                }
            });
        }
    }
})();