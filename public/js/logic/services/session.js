'use strict';

var SESSION = (function(){

    if(typeof(Storage) !== "undefined") {

        return {

            get: function(name){
                var result = String(sessionStorage.getItem(name));
                if(result=='null'){
                    return null;
                }else{
                    return result;
                }
            },

            set: function(name, value){
                sessionStorage.setItem(name, value);
            },

            remove: function(name){
                sessionStorage.removeItem(name);
            },

            clear: function(){
                sessionStorage.clear();
            }
        }
    } else {
        alert('ERROR: Sorry! No Web Storage support..');
    }
})();
