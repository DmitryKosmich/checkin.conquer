
var CURR_CHAT = {
    me: {
        id:'',
        name: ''
    },
    friend: {
        id:'',
        name: ''
    }
};

(function(){
    'use strict';

    window.onload = function() {
        setLocalization();
        $( "#message_input" ).focus();
        setSubmitListener();
        initCurrChat(function(){
            showChat(function(chat){
                listen(chat);
                $("#loadingImage").fadeOut("slow");
                $("#message_history").animate({ scrollTop: 10000 }, "slow");
            });
        });
    };

    function initCurrChat(callback){
        getCompanion(SESSION.get("currentUserId"), function(me){
            getCompanion(getURLParameter('id'), function(friend){
                if(me && friend){
                    CURR_CHAT.friend.name = friend.name;
                    CURR_CHAT.friend.id = friend.FQUserId;
                    CURR_CHAT.me.name = me.name;
                    CURR_CHAT.me.id = me.FQUserId;
                    callback();
                }
            });
        });
    }

    function getCompanion(FQUserId, callback) {
        DB.user.search({FQUserId: FQUserId }, function(err, users){
            ERROR.errorWrapper(err, users, function(users){
                if(users){
                    callback(users[0]);
                }else{
                    callback(null);
                }
            });
        });
    }

    function listen(chat){
        setTimeout(function(){
            showChat(function(chat){
                console.log('I listen!');
                listen(chat);
            });
        }, 3000);
    }

    function setSubmitListener() {
        $('#message_input').keydown(function (e) {
            if (e.ctrlKey && e.keyCode == 13) {
                sendMessage();
            }
        });
    }

    function showChat(callback){
        MESSAGER.getChat(getURLParameter('id'), function(chat){
            DB.message.getMany(chat.messages, function(err, messages){
                ERROR.errorWrapper(err, messages, function(messages){
                    if(messages){
                        showMessages(messages);
                        callback(chat);
                    }else{
                        ALERT.show("Messages missing", ALERT_TYPE.INFO);
                        callback(chat);
                    }
                });
            });
        });
    }
})();

var sendMessage = (function(){

    return function(){
        MESSAGER.getChat(getURLParameter('id'), function(chat){
            var text = $("#message_input").val();
            MESSAGER.send(text, chat, function(chat){
                console.log(JSON.stringify(chat));
                DB.message.getMany(chat.messages, function(err, messages){
                    ERROR.errorWrapper(err, messages, function(messages){
                        if(messages){
                            $("#message_input").val("");
                            showMessages(messages);
                            $("#message_history").animate({ scrollTop: 100000 }, "slow");
                        }else{
                            ALERT.show("Messages missing", ALERT_TYPE.INFO);
                        }
                    });
                });
            });
        });
    }
})();

var showMessages = (function(){

    return function(messages){
        var  chatTag =  $("#message_history");
        chatTag.html('');
        for(var i = 0; i < messages.length; i++){
            if(messages[i].author == SESSION.get("currentUserId")){
                chatTag.append('<li class="message author_message"><a href="/user?id='+CURR_CHAT.me.id+'">'+CURR_CHAT.me.name+'</a><br>'+messages[i].body+'</li>');
            }else{
                chatTag.append('<li class="message"><a href="/user?id='+CURR_CHAT.friend.id+'">'+CURR_CHAT.friend.name+'</a><br>'+messages[i].body+'</li>');
            }
        }
    }
})();