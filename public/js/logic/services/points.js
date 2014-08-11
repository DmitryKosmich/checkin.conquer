'use strict';

var POINT_COST = {

    FQ_COUNTRY: 100,
    COUNTRY: 10,
    FQ_CITY: 50,
    FRIEND: 20,
    ALBUM: 40
};

var POINTS = (function(){

    var calculateCountriesPoints = function(checkins){
        var points = 0;
        var FQCountries = [];
        var Countries = [];
        for(var i = 0; i< checkins.length; i++){
            if(checkins[i].isFQ == true){
                FQCountries.push(checkins[i].cc);
            }else{
                Countries.push(checkins[i].cc);
            }
        }
        FQCountries = removeRepetition(FQCountries);
        points += FQCountries.length * POINT_COST.FQ_COUNTRY;
        points += Countries.length * POINT_COST.COUNTRY;
        return points;
    };

    var calculateFriendsPoints = function(points, id, callback){
        DB.user.search({FQUserId: id}, function(err, users){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(users[0]){
                    points += users[0].friends.length * POINT_COST.FRIEND;
                    calculateAlbumsPoints(points, id, callback);
                }else{
                    calculateAlbumsPoints(points, id, callback);
                }
            }
        });

    };

    var calculateAlbumsPoints = function(points, id, callback){
        DB.album.getAll(id, function(err, albums){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(albums[0]){
                    points += albums.length * POINT_COST.ALBUM;
                    callback(points);
                }else{
                    callback(points);
                }
            }
        });
    };

    return {
        calculate: function(id, callback){
            var points = 0;
            DB.checkin.getAll(id, function(err, checkins){
                if(err){
                    ALERT.show(err, ALERT_TYPE.DANGER);
                }else{
                    if(checkins[0]){
                       var cities = getCitiesFromCheckins(checkins);
                        points += cities.length * POINT_COST.FQ_CITY;
                        points += calculateCountriesPoints(checkins);
                        calculateFriendsPoints(points, id, callback);
                    }else{
                        calculateFriendsPoints(points, id, callback);
                    }
                }
            });
        }
    }
})();
