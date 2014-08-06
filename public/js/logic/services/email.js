'use strict';

var EMAIL = (function(){

    return {
        send: function(message, callback){
            message.user = config.EMAIL_USER;
            message.password = config.EMAIL_PASSWORD;
            $.post( "/email/send", {'message' : message}, function( data ) {
                callback(data);
            }, "json");
        }
    }
})();
