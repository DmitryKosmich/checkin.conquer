'use strict';

var SYNCHRONIZER = (function(){

    var createUser = function(FQUser, FQUserId){

        if(!FQUserId){
            FQUserId = SESSION.get("currentUserId");
        }
        var newUser = {
            FQUserId: FQUserId,
            name : FQUser.firstName,
            surname : FQUser.lastName,
            homeCity : FQUser.homeCity,
            email : FQUser.contact.email,
            avatarSrc : FQUser.photo.prefix + '110x110' + FQUser.photo.suffix
        };
        if(FQUserId == SESSION.get("currentUserId")){
            newUser.lastUpdate = new Date().getTime() / 1000;
        }
        console.log(newUser);
        return newUser;
    };

    var createCheckin = function(id, FQCheckin){
        return {
            FQUserId: id,
            name: FQCheckin.venue.name,
            created: FQCheckin.createdAt,
            address: FQCheckin.venue.location.address,
            city: FQCheckin.venue.location.city,
            cc: FQCheckin.venue.location.cc.toLowerCase(),
            lat: FQCheckin.venue.location.lat,
            lng: FQCheckin.venue.location.lng,
            FQCheckinId: FQCheckin.id,
            isFQ: true
        }
    };

    var createCountry = function (countryData) {
        return {
            name: countryData.name,
            capital: countryData.capital,
            region: countryData.region,
            subregion: countryData.subregion,
            population: countryData.population,
            area: countryData.area,
            gini: countryData.gini,
            cc: countryData.alpha2Code.toLowerCase(),
            flagSrc: "http://www.geonames.org/flags/x/"+countryData.alpha2Code.toLowerCase()+".gif"
        }
    };

    var add = (function(){

        return {

            album: function(album, callback){

                PICASA.getAlbumPreviewUrl(album.userPicasaId, album.albumPicasaId, function(err, url){
                    if(err) {
                        callback(err);
                    }else{
                        album.FQUserId = SESSION.get("currentUserId");
                        album.previewSrc = url;
                        DB.album.add(album, function(data){
                            callback(null, data);
                        });
                    }
                });
            },

            checkin: function(checkin, callback){

                checkin.FQUserId = SESSION.get("currentUserId");
                DB.checkin.add(checkin, function(data){
                    callback(null, data);
                });
            },

            country: function(country, callback){

                RESTCOUNTRIES.getCountryByCC(country.cc, function(err, countryData){
                    if(err) {
                        callback(err);
                    }else{
                        var newCountry = createCountry(countryData);
                        DB.country.add(newCountry, function(data){
                            callback(null, data);
                        });
                    }
                });
            },

            user: function(user, callback){

                FOURSQUARE.getUser(user.FQUserId, function(err, FQUser){
                    if(err){
                        callback(err);
                    }else{
                        var newUser = createUser(FQUser, user.FQUserId);

                        FOURSQUARE.getFriends(user.FQUserId, function(err, data){
                            if(err){
                                callback(err);
                            }else{
                                var friends = [];
                                for(var i = 0; i < data.length; i++){
                                    friends.push(data[i].id);
                                }
                                newUser.friends = friends;
                                DB.user.add(newUser, function(data){
                                    callback(null, data);
                                });
                            }
                        });
                    }
                });
            }
        }
    })();

    var update = (function() {

        var isExistFQCheckins = function(checkin, FQCheckins){
            for(var i = 0; i < FQCheckins.length; i++){
                if(checkin.FQCheckinId){
                    if(checkin.FQCheckinId == FQCheckins[i].id){
                        return true;
                    }
                }
            }
            return false;
        };

        var isExistDBCheckins = function(checkin, DBCheckins){
            for(var i = 0; i < DBCheckins.length; i++){
                if(DBCheckins[i].FQCheckinId){
                    if(checkin.id == DBCheckins[i].FQCheckinId){
                        return true;
                    }
                }
            }
            return false;
        };

        var deleteCheckins = function(id, FQCheckins, DBCheckins, callback){
            for(var i = 0; i < DBCheckins.length; i++){
                if(isExistFQCheckins( DBCheckins[i], FQCheckins) == false){
                    DB.checkin.delete(DBCheckins[i]._id, function(data){});
                }
            }
        };

        var updateCheckins = function(id, FQCheckins, DBCheckins, callback){

            var updateCheckinsTransaction = function(index, FQCheckins, DBCheckins, callback){
                if(isExistDBCheckins(FQCheckins[index], DBCheckins)){
                    DB.checkin.search({FQCheckinId: FQCheckins[index].id}, function(checkins){
                        if(checkins[0]){
                            DB.checkin.update(checkins[0]._id, createCheckin(id, FQCheckins[index]), function(data){
                                console.log('updateCheckinsTransaction '+ index);
                                if(index >=  FQCheckins.length-1){
                                    callback(null, data);
                                    return '';
                                }else{
                                    updateCheckinsTransaction(++index, FQCheckins, DBCheckins, callback);
                                }
                            });
                        }
                    });
                }else{
                    if(index >=  FQCheckins.length-1){
                        callback(null);
                        return '';
                    }else{
                        updateCheckinsTransaction(++index, FQCheckins, DBCheckins, callback);
                    }
                }
            };

            var startIndex = 0;
            updateCheckinsTransaction(startIndex, FQCheckins, DBCheckins, callback);
        };

        var addCheckins = function(id, FQCheckins, DBCheckins, callback){

            var addCheckinTransaction = function(index, FQCheckins, DBCheckins, callback){
                if(isExistDBCheckins(FQCheckins[index], DBCheckins) == false){
                    SYNCHRONIZER.add.checkin(createCheckin(id, FQCheckins[index]), function(err, data){
                        if(err){
                            console.error('ERROR: addCheckins()');
                        }else{
                            console.log('addCheckinTransaction '+ index);
                            if(index >=  FQCheckins.length-1){
                                callback(null, data);
                                return '';
                            }else{
                                addCheckinTransaction(++index, FQCheckins, DBCheckins, callback);
                            }
                        }
                    });
                }else{
                    if(index >=  FQCheckins.length-1){
                        callback(null);
                        return '';
                    }else{
                        addCheckinTransaction(++index, FQCheckins, DBCheckins, callback);
                    }
                }

            };

            var startIndex = 0;
            addCheckinTransaction(startIndex, FQCheckins, DBCheckins, callback);
        };

        return {

            albums: function (callback) {
                var index = 0;
                DB.album.getAll(null, function (albums) {
                    for(var i = 0; i < albums.length; i++){
                        (function(n, m){
                            PICASA.getAlbumPreviewUrl(albums[n].userPicasaId, albums[n].albumPicasaId, function(err, url){
                                if(err) {
                                    callback(err);
                                }else{
                                    albums[n].previewSrc = url;
                                    var id = albums[n]._id;
                                    delete albums[n]._id;
                                    delete albums[n].__v;
                                    DB.album.update(id, albums[n], function(data){
                                        if(n == m){
                                            callback(null, data);
                                        }
                                    });
                                    ++index;
                                }
                            });
                        })(i , albums.length-1);
                    }
                });
                callback(null);
            },

            checkins: function (id, callback) {
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                FOURSQUARE.getAllCheckins(id, function(FQCheckins){
                    DB.checkin.getAll(id, function(data){
                        var DBCheckins = [];
                        for(var i = 0; i < data.length; i++){
                            if(data[i].isFQ==true){
                                DBCheckins.push(data[i]);
                            }
                        }
                        addCheckins(id, FQCheckins, DBCheckins, function(err){
                            updateCheckins(id, FQCheckins, DBCheckins, function(err){});
                            deleteCheckins(id, FQCheckins, DBCheckins, function(err){});
                        });
                        callback(null, data);
                    });
                });
            },

            countries: function (callback) {

                var addCountryTransaction = function(index, checkins, callback){
                    SYNCHRONIZER.add.country({cc: checkins[index].cc}, function(err, data){
                        if(err){
                            callback(err);
                        }else{
                            if(index >= checkins.length-1){
                                callback(err, data);
                                return '';
                            }else{
                                addCountryTransaction(++index, checkins, callback);
                            }
                        }
                    });
                };

                DB.checkin.getAll(null, function(checkins){
                    var startIndex = 0;
                    addCountryTransaction(startIndex, checkins, callback);
                });

            },

            user: function (FQUserId, callback) {
                if(FQUserId==null){
                    FQUserId = SESSION.get("currentUserId");
                }
                DB.user.search({FQUserId: FQUserId}, function(users){
                    if(users[0]){
                        FOURSQUARE.getUser(FQUserId, function(err, FQUser){
                            if(err){
                                callback(null);
                            }else{
                                FOURSQUARE.getFriends(FQUserId, function(err, data){
                                    if(err){
                                        callback(err);
                                    }else{
                                        var friends = [];
                                        for(var i = 0; i < data.length; i++){
                                            friends.push(data[i].id);
                                        }
                                        var newUser =  createUser(FQUser, FQUserId);
                                        newUser.friends = friends;
                                        DB.user.update(users[0]._id, newUser, function(data){
                                            callback(null, data);
                                        });
                                    }
                                });
                            }
                        });
                    }else{
                        SYNCHRONIZER.add.user({FQUserId: FQUserId}, function(err, data){
                            if(err){
                                callback(err);
                            }else{
                                callback(null, data);
                            }
                        });
                    }
                });
            },

            friends: function (callback) {

                var updateUserTransaction = function(index, user, callback){
                    SYNCHRONIZER.update.user( user.friends[index], function(err, data){
                        if(index >= user.friends.length-1){
                            callback(err, data);
                            return '';
                        }else{
                            updateUserTransaction(++index, user, callback);
                        }
                    });
                };

                DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(users){
                    if(users[0]){
                        var startIndex = 0;
                        updateUserTransaction(startIndex, users[0], callback);
                    }
                });
            },

            all: function(callback){
                $("#loadingImage").show();
                ALERT.show("Start update!", ALERT_TYPE.info);
                SYNCHRONIZER.update.user(null, function(err){
                    if(err){
                        console.error('ERROR: update user');
                    }else{
                        SYNCHRONIZER.update.friends(function(err){
                            if(err){
                                console.error('ERROR: update friends');
                            }
                        });
                        SYNCHRONIZER.update.albums(function(err){
                            if(err){
                                console.error('ERROR: update albums');
                            }
                        });
                        SYNCHRONIZER.update.checkins(null, function(err){
                            if(err){
                                console.error('ERROR: update checkins');
                            }else{
                                SYNCHRONIZER.update.countries(function(err){
                                    if(err){
                                        console.error('ERROR: SYNCHRONIZER.update.countries()');
                                        callback(err);
                                    }else{
                                        callback(null, 'OK');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    })();

    return {
        add: add,
        update: update
    }
})();
