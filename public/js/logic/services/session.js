'use strict';

var SESSION = (function(){

    if(typeof(Storage) !== "undefined") {

        return {
            get: function(name){
                return String(sessionStorage.getItem(name));
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
