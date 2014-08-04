'use strict';

var DB = (function(){

    var country = (function(){
        return {
            get: function(id, callback){
                $.post( "/country/get", {'id' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            add: function(country, callback){
                $.post( "/country/add", {'country' : country}, function( data ) {
                    callback(data);
                }, "json");
            },

            delete: function(id, callback){
                $.post( "/country/delete", {'id' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            getAll: function(callback){
                $.post( "/country/all", {}, function( data ) {
                    callback(data);
                }, "json");
            },

            search: function(params, callback){
                $.post( "/country/search", {'params' : params}, function( data ) {
                    callback(data);
                }, "json");
            },

            update: function(id, country, callback){
                $.post( "/country/update", {'id' : id, 'country': country}, function( data ) {
                    callback(data);
                }, "json");
            }
        }
    })();

    var checkin = (function(){
        return {
            get: function(id, callback){
                $.post( "/checkin/get", {'id' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            add: function(checkin, callback){
                $.post( "/checkin/add", {'checkin' : checkin}, function( data ) {
                    callback(data);
                }, "json");
            },

            delete: function(id, callback){
                $.post( "/checkin/delete", {'id' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/checkin/all", {'FQUserId' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            search: function(params, callback){
                $.post( "/checkin/search", {'params' : params}, function( data ) {
                    callback(data);
                }, "json");
            },

            update: function(id, checkin, callback){
                $.post( "/checkin/update", {'id' : id, 'checkin': checkin}, function( data ) {
                    callback(data);
                }, "json");
            }
        }
    })();

    var user = (function(){
        return {
            get: function(id, callback){
                $.post( "/user/get", {'id' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            add: function(user, callback){
                $.post( "/user/add", {'user' : user}, function( data ) {
                    callback(data);
                }, "json");
            },

            delete: function(id, callback){
                $.post( "/user/delete", {'id' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            getAll: function(callback){
                $.post( "/user/all", {}, function( data ) {
                    callback(data);
                }, "json");
            },

            search: function(params, callback){
                $.post( "/user/search", {'params' : params}, function( data ) {
                    callback(data);
                }, "json");
            },

            update: function(id, user, callback){
                $.post( "/user/update", {'id' : id, 'user': user}, function( data ) {
                    callback(data);
                }, "json");
            }
        }
    })();

    var album = (function(){
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

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/album/all", {'FQUserId' : id}, function( data ) {
                    callback(data);
                }, "json");
            },

            search: function(params, callback){
                $.post( "/album/search", {'params' : params}, function( data ) {
                    callback(data);
                }, "json");
            },

            update: function(id, album, callback){
                $.post( "/album/update", {'id' : id, 'album': album}, function( data ) {
                    callback(data);
                }, "json");
            }
        }
    })();

    return {
        country: country,
        checkin: checkin,
        user: user,
        album: album
    }
})();