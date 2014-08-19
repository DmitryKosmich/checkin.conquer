(function(){
    'use strict';

    window.onload = function() {
        setLocalization();
        showChats(function(){
            $("#loadingImage").fadeOut("slow");
        });
    };

     function showChats(callback){
         DB.chat.getAll(SESSION.get('currentUserId'), function(err, chats){
             ERROR.errorWrapper(err, chats, function(chats){
                 if(chats){
                     showChat(0, chats, callback);
                 }else{
                     ALERT.show("You have not messages!", ALERT_TYPE.INFO);
                     $("#loadingImage").fadeOut("slow");
                 }
             });
         });
     }

    function showChat(index, chats, callback){
        getFriend(chats[index], function(friend){
            if(chats[index].messages.length>0){
                getMessage(chats[index].messages[chats[index].messages.length-1], function(message){
                    if(message){
                        if(friend){
                            $('.list').append(createLiElem(message, friend));
                            checkEnd(index, chats, callback);
                        }else{
                            checkEnd(index, chats, callback);
                        }
                    }else{
                        checkEnd(index, chats, callback);
                    }
                });
            }else{
                checkEnd(index, chats, callback);
            }
        });
    }

    function createLiElem(message, friend){
        return ''+
        '<li class="elem">' +
        '<a href="/chat?id='+friend.FQUserId+'">' +
        '<div class="chat_friend">'+friend.name+' '+friend.surname+'</div><hr><div>'+message.body+'</div>' +
        '<div class="trivial_text">'+TIME.getDdMmYyyyHhMm(message.created, ".")+'</div>' +
        '</a>' +
        '</li>';
    }

    function checkEnd(index, chats, callback){
        if(index >= chats.length-1){
            callback();
        }else{
            showChat(++index, chats, callback);
        }
    }

    function getFriend(chat, callback) {
        DB.user.search({FQUserId: chat.from==SESSION.get('currentUserId')?chat.to:chat.from }, function(err, users){
            ERROR.errorWrapper(err, users, function(users){
                if(users){
                    callback(users[0]);
                }else{
                    callback(null);
                }
            });
        });
    }

    function getMessage(id, callback){
        DB.message.get(id, function(err, message){
            if(err){
                ALERT.show("Getting message", ALERT_TYPE.DANGER);
                callback(null);
            }else{
                callback(message);
            }
        });
    }
})();