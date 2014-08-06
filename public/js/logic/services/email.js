'use strict';

var EMAIL = (function(){

    return {
        send: function(message, callback){
            message.user = config.EMAIL_USER;
            message.password = config.EMAIL_PASSWORD;
            $.post( "/email/send", {'message' : message})
                .done(function( data ) {
                    callback(null, data);
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.EMAIL));
                }, "json");
        }
    }
})();
