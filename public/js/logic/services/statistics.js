
var STATISTICS = (function(){

    'use strict';

    return {

        getCountries: function(FQUserId, callback){

            var getFullCountriesInfoByCc = function(index, ccs, result, callback){
                DB.country.search({cc: ccs[index]}, function(err, countries){
                    ERROR.errorWrapper(err, countries, function(countries){
                        if(countries){
                            result.push(countries[0]);
                            if(index >= ccs.length-1){
                                callback(result);
                            }else{
                                getFullCountriesInfoByCc(++index, ccs, result, callback);
                            }
                        }
                    });
                })
            };

            DB.checkin.getAll(FQUserId, function(err, checkins){
                ERROR.errorWrapper(err, checkins, function(checkins){
                    if(checkins){
                        var countries = [];
                        for(var i =0; i < checkins.length; i++){
                            countries.push(checkins[i].cc);
                        }
                        countries = removeRepetitionArr(countries);
                        getFullCountriesInfoByCc(0, countries, [], function(allCountriesInfo){
                            callback(allCountriesInfo);
                        });
                    }else{
                        callback([]);
                    }
                });
            });
        },

        getArea: function(FQUserId, callback){
            STATISTICS.getCountries(FQUserId, function(countries){
                var area = 0;
                for(var i = 0; i < countries.length; i++){
                    area += +countries[i].area;
                }
                callback(area);
            });
        },

        getPopulation: function(FQUserId, callback){
            STATISTICS.getCountries(FQUserId, function(countries){
                var population = 0;
                for(var i = 0; i < countries.length; i++){
                    population += +countries[i].population;
                }
                callback(population);
            });
        },

        getCountriesCount: function(FQUserId, callback){
            STATISTICS.getCountries(FQUserId, function(countries){
                callback( countries ? countries.length : 0 );
            });
        },

        getCheckinsCount: function(FQUserId, callback){
            DB.checkin.getAll(FQUserId, function(err, checkins){
                ERROR.errorWrapper(err, checkins, function(checkins){
                    callback( checkins ? checkins.length : 0 );
                });
            });
        },

        getCitiesCount: function(FQUserId, callback){
            DB.checkin.getAll(FQUserId, function(err, checkins){
                ERROR.errorWrapper(err, checkins, function(checkins){
                    if(checkins){
                        var cities = [];
                        for(var i = 0; i < checkins.length; i++){
                            if(checkins[i].isFQ == true){
                                cities.push(checkins[i].city);
                            }
                        }
                        callback(removeRepetitionArr(cities).length);
                    }else{
                        callback(0);
                    }
                });
            });
        },

        getAlbumsCount: function(FQUserId, callback){
            DB.album.getAll(FQUserId, function(err, albums){
                ERROR.errorWrapper(err, albums, function(albums){
                    callback( albums ? albums.length : 0 );
                });
            });
        },

        getFriendsCount: function(FQUserId, callback){
            DB.user.search({FQUserId:FQUserId}, function(err, users){
                ERROR.errorWrapper(err, users, function(users){
                    if(users[0]){
                        callback( users[0].friends[0] ? users[0].friends.length : 0 );
                    }
                })
            });
        },

        getPointsOfCountry: function(FQUserId, country, callback){
            POINTS.getCountryPoints(FQUserId, country, function(points){
                callback(points);
            });
        },

        getPoints: function(FQUserId, callback){
            POINTS.calculate(FQUserId, function(points){
                callback(points);
            });
        }
    }
})();