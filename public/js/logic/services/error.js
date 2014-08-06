'use strict';

var ERROR_TYPE = {

    DATA_BASE: "DATA_BASE",
    EMAIL: "EMAIL"
};

var ERROR = (function(){

    return {
        create: function(type, message){
            if(message){
                message = ': '+message;
            }else{
                message = '!';
            }
            if(type == ERROR_TYPE.DATA_BASE){
                return "Data base error"+message;
            }
            if(type == ERROR_TYPE.EMAIL){
                return "Email error"+message;
            }
        }
    }
})();
