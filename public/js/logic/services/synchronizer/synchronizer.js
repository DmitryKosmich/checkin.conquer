'use strict';

var SYNCHRONIZER = (function(){

    var createUser = function(FQUser, FQUserId){
        if(!FQUserId){
            FQUserId = SESSION.get("currentUserId");
        }
        return {
            FQUserId: FQUserId,
            name : FQUser.firstName,
            surname : FQUser.lastName,
            homeCity : FQUser.homeCity,
            frindsNmbr : FQUser.friends.count,
            checkinsNmbr : FQUser.checkins.count,
            tipsNmbr : FQUser.tips.count,
            badgesNmbr : FQUser.badges.count,
            mayorshipsNmbr : FQUser.mayorships.count,
            avatarSrc : FQUser.photo.prefix + '110x110' + FQUser.photo.suffix,
            lastUpdate : new Date().getTime() / 1000
        }
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
                    console.log(user.FQUserId);
                    if(err){
                        callback(err);
                    }else{
                        var newUser = createUser(FQUser);
                        newUser.FQUserId = user.FQUserId;

                        FOURSQUARE.getFriends(user.FQUserId, function(err, data){
                            if(err){
                                callback(err);
                            }else{
                                newUser.friends = [];
                                for(var i = 0; i < data.length; i++){
                                    newUser.friends.push(data[i].id);
                                }
                                DB.user.add(newUser, function(data){
                                    callback(err, data);
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
            for(var i = 0; i < FQCheckins.length; i++){
                if(isExistDBCheckins(FQCheckins[i], DBCheckins)){
                    (function(n){
                        DB.checkin.search({FQCheckinId: FQCheckins[n].id}, function(checkins){
                            if(checkins[0]){
                                DB.checkin.update(checkins[0]._id, createCheckin(id, FQCheckins[n]), function(data){});
                            }
                        });
                    })(i);
                }
            }
        };

        var addCheckins = function(id, FQCheckins, DBCheckins, callback){
            for(var i = 0; i < FQCheckins.length; i++){
                if(isExistDBCheckins(FQCheckins[i], DBCheckins) == false){
                    SYNCHRONIZER.add.checkin(createCheckin(id, FQCheckins[i]), function(err){
                        if(err){
                            alert('ERROR add checkin');
                        }
                    });
                }
            }
        };

        return {

            albums: function (callback) {
                var index = 0;
                DB.album.getAll(null, function (albums) {
                    for(var i = 0; i < albums.length; i++){
                        PICASA.getAlbumPreviewUrl(albums[i].userPicasaId, albums[i].albumPicasaId, function(err, url){
                            if(err) {
                                callback(err);
                            }else{
                                albums[index].previewSrc = url;
                                DB.album.update(albums[index]._id, albums[index], function(data){
                                    callback(null, data);
                                });
                                ++index;
                            }
                        });
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
                        addCheckins(id, FQCheckins, DBCheckins, function(err){});
                        updateCheckins(id, FQCheckins, DBCheckins, function(err){});
                        deleteCheckins(id, FQCheckins, DBCheckins, function(err){});
                        callback(null);
                    });
                });
            },

            countries: function (callback) {
                var index = 0;
                DB.checkin.getAll(null, function(checkins){
                    for(var i = 0; i < checkins.length; i++){
                        SYNCHRONIZER.add.country({cc: checkins[index].cc}, function(err, data){
                            if(err){
                                callback(err);
                            }else{
                                callback(err, data);
                            }
                        });
                        ++index;
                    }
                    index = 0;
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
                                DB.user.update(users[0]._id, createUser(FQUser, FQUserId), function(data){
                                    callback(null, data);
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
                DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(users){
                    if(users[0]){
                        for(var i = 0; i < users[0].friends.length; i++){
                            SYNCHRONIZER.update.user( users[0].friends[0], function(err, data){
                                callback(err, data);
                            });
                        }
                    }
                });
            },
            all: function(callback){
                console.log('ALL update start');
                SYNCHRONIZER.update.user(null, function(err){
                    if(err){
                        alert('ERROR: update user');
                    }else{
                        SYNCHRONIZER.update.friends(function(err){
                            if(err){
                                alert('ERROR: update friends');
                            }
                        });
                        SYNCHRONIZER.update.albums(function(err){
                            if(err){
                                alert('ERROR: update albums');
                            }
                        });
                        SYNCHRONIZER.update.checkins(null, function(err){
                            if(err){
                                alert('ERROR: update checkins');
                            }else{
                                SYNCHRONIZER.update.countries(function(err){
                                    if(err){
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
