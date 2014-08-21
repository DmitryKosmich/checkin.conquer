
var CURR_CHAT = {
    me: {
        id:'',
        name: ''
    },
    friend: {
        id:'',
        name: ''
    },
    updateTimer: CONFIG.UPDATE_TIME_INTERVAL,
    lastUpdate: '0'
};

(function(){
    'use strict';

    $(document).ready(function () {
        INITIALIZER.wrapper(function(){
            $( "#message_input" ).focus();
            setSubmitListener();
            initCurrChat(function(){
                showChat(function(chat){
                    listen(chat);
                    updateTimer();
                    $("#loadingImage").fadeOut("slow");
                });
            });
        });
    });

    function initCurrChat(callback){
        getCompanion(SESSION.get("currentUserId"), function(me){
            getCompanion(getURLParameter('id'), function(friend){
                if(me && friend){
                    CURR_CHAT.friend.name = friend.name;
                    CURR_CHAT.friend.id = friend.FQUserId;
                    CURR_CHAT.me.name = me.name;
                    CURR_CHAT.me.id = me.FQUserId;
                    $('#friend_name').append(friend.name+" "+friend.surname);
                    $('#my_name').append(me.name+" "+me.surname);
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

    function updateTimer(){
        setTimeout(function(){
            $('#update_timer').html(CURR_CHAT.updateTimer);
            if(CURR_CHAT.updateTimer>0){
                CURR_CHAT.updateTimer--;
            }
            updateTimer();
        }, 1000);

    }

    function listen(){
        setTimeout(function(){
            showChat(function(){
                CURR_CHAT.updateTimer = CONFIG.UPDATE_TIME_INTERVAL;
                listen();
            });
        }, CONFIG.UPDATE_TIME_INTERVAL * 1000);
    }

    function setSubmitListener() {
        $('textarea#message_input').keydown(function (e) {
            if (e.keyCode === 13 && e.ctrlKey) {
                //console.log("enterKeyDown+ctrl");
                $(this).val(function(i,val){
                    return val + "\n";
                });
            }
        }).keypress(function(e){
            if (e.keyCode === 13 && !e.ctrlKey) {
                sendMessage();
                return false;
            }
        });
    }

})();

var showChat = (function(){

    function needForUpdate(messages) {
        if(messages[0]){
            if(messages[messages.length-1].created != CURR_CHAT.lastUpdate){
                CURR_CHAT.lastUpdate = messages[messages.length-1].created;
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    return function (callback){
        MESSAGER.getChat(getURLParameter('id'), function(chat){
            if(chat){
                DB.message.search({chatId: chat._id}, 15, function(err, messages){
                    ERROR.errorWrapper(err, messages, function(messages){
                        if(messages){
                            if(needForUpdate(messages) == true){
                                showMessages(messages);
                            }
                            callback();
                        }else{
                            ALERT.show("Messages missing", ALERT_TYPE.INFO);
                            callback();
                        }
                    });
                });
            }else{
                callback();
            }
        });
    }
})();

var showMessages = (function(){

    return function(messages){
        var  chatTag =  $("#message_history");
        chatTag.html('');
        for(var i = 0; i < messages.length; i++){
            if(messages[i].author == SESSION.get("currentUserId")){
                drawMessage(messages[i], 'author_message');
            }else{
                drawMessage(messages[i]);
            }
        }

        setScrollDown();
    }
})();

var setScrollDown = (function(){
    return function(){
        /*var ul = $("ul");
        var last = ul.children().last();
        var wholeHeight = last.offset().top
            + last.outerHeight()
            + parseFloat(ul.css("padding-top"))
            + parseFloat(ul.css("padding-bottom"));*/
        $("#message_history").animate({ scrollTop: 100000 });
    }
})();

var sendMessage = (function(){

    var updateMessagesHistory = function(text, messageInputTag){
        MESSAGER.getChat(getURLParameter('id'), function(chat){
            if(text.length < 450){
                MESSAGER.send(text, chat, function(message){
                    DB.message.search({chatId: message.chatId}, 15, function(err, messages){
                        ERROR.errorWrapper(err, messages, function(messages){
                            if(messages){
                                showMessages(messages);
                            }else{
                                messageInputTag.val(text);
                                ALERT.show("Messages missing", ALERT_TYPE.INFO);
                            }
                        });
                    });
                });
            }else{
                ALERT.show("Your message should be less than 450 characters!", ALERT_TYPE.WARNING);
            }
        });

    };

    return function(){
        var messageInputTag = $("#message_input");
        var text = messageInputTag.val();
        messageInputTag.val('');
        var tempMessage = MESSAGER.createMessage(text);
        if(text != ""){
            drawMessage(tempMessage, 'author_message');
            updateMessagesHistory(text, messageInputTag);
        }
    }
})();

var selfUpdate = (function(){
    return function(){
        showChat(function(){
            CURR_CHAT.updateTimer = 5;
        });
    }
})();

var drawMessage = (function(){

    return function(message, author_message) {
        author_message = author_message ? author_message : '';
        $("#message_history").append(
                '<li class="message '+author_message+'">' +
                '<a href="/user?id='+CURR_CHAT.friend.id+'">'+CURR_CHAT.friend.name+'</a>&nbsp&nbsp' +
                '<br>'+message.body +
                '<br><span class="trivial_text">'+TIME.getDdMmYyyyHhMm(message.created, ".")+'</span>' +
                '</li>');
    }
})();