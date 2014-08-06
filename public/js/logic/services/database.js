'use strict';

var DB = (function(){

    var country = (function(){
        return {
            get: function(id, callback){
                $.post( "/country/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            add: function(country, callback){
                $.post( "/country/add", {'country' : country})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/country/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            getAll: function(callback){
                $.post( "/country/all", {})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/country/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            update: function(id, country, callback){
                $.post( "/country/update", {'id' : id, 'country': country})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            }
        }
    })();

    var checkin = (function(){
        return {
            get: function(id, callback){
                $.post( "/checkin/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            add: function(checkin, callback){
                $.post( "/checkin/add", {'checkin' : checkin})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/checkin/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/checkin/all", {'FQUserId' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/checkin/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            update: function(id, checkin, callback){
                $.post( "/checkin/update", {'id' : id, 'checkin': checkin})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            }
        }
    })();

    var user = (function(){
        return {
            get: function(id, callback){
                $.post( "/user/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            add: function(user, callback){
                $.post( "/user/add", {'user' : user})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/user/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            getAll: function(callback){
                $.post( "/user/all", {})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/user/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            update: function(id, user, callback){
                $.post( "/user/update", {'id' : id, 'user': user})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            }
        }
    })();

    var album = (function(){
        return {
            get: function(id, callback){
                $.post( "/album/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            add: function(album, callback){
                $.post( "/album/add", {'album' : album})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/album/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/album/all", {'FQUserId' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/album/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
                    }, "json");
            },

            update: function(id, album, callback){
                $.post( "/album/update", {'id' : id, 'album': album})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE));
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