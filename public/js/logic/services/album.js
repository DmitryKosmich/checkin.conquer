'use strict';

var ALBUM = (function(){
    return {
        get: function(id, callback){
            $.post( "/album/get", {'id' : id}, function( data ) {
                callback(data);
            }, "json");
        },

        add: function(album, callback){
            $.post( "/album/add", {'album' : album}, function( data ) {
                callback(data);
            }, "json");
        },

        delete: function(id, callback){
            $.post( "/album/delete", {'id' : id}, function( data ) {
                callback(data);
            }, "json");
        },
        getAll: function(album, callback){
            $.post( "/albums/get", {'album' : album}, function( data ) {
                callback(data);
            }, "json");
        }
    }
})();