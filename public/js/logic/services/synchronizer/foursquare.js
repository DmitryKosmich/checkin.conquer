'use strict';

var FOURSQUARE =  (function() {

    return  {

        getCheckins: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/checkins?limit=250&oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(data);
            }, "json");
        },

        getCheckinsWithParams: function (id, limit, offset, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/checkins?limit="+limit+"&offset="+offset+"&oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(data);
            }, "json");
        },

        getFriends: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/friends?oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(null, data.response.friends.items);
            }, "json");
        },

        getUser: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "?oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(null, data.response.user);
            }, "json");
        },

        setCheckinCount: function (id, callback){
            FOURSQUARE.getCheckins(id, function(data){
                callback(data.response.checkins.count);
            });
        },

        getAllCheckins : function(id, callback){
            var CHECKIN_LIMIT = 250;
            var CHECKIN_OFFSET = 250;
            SESSION.set('CHECKINS', '');
            this.setCheckinCount(id, function(count){
                for(var i = 0; i <= count/CHECKIN_OFFSET; i++){
                    FOURSQUARE.getCheckinsWithParams(id, CHECKIN_LIMIT, CHECKIN_OFFSET*i, function(data){
                        if('' === SESSION.get('CHECKINS')) {
                            SESSION.set("CHECKINS", JSON.stringify(data.response.checkins.items));
                        }else{
                            var temp = SESSION.get('CHECKINS');
                            var checkins = JSON.parse(temp);
                            checkins.concat(data.response.checkins.items);
                            SESSION.set("CHECKINS", JSON.stringify(checkins));
                        }
                        //TODO: free sessionStorage item
                        callback(JSON.parse(SESSION.get('CHECKINS')));
                    });
                }
            });
        },

        getVisitedCountries: function (id, callback){
            FOURSQUARE.getAllCheckins('self', function(data){
                callback(convertChekinsToCountryCodes(data));
            });
        },

        getCitiesByCC: function(countryCode, callback){
            FOURSQUARE.getAllCheckins('self', function(data){
                var cities = {};
                for(var i = 0; i<data.length; i++){
                    if(countryCode==data[i].venue.location.cc.toLowerCase()){
                        cities[data[i].venue.location.city]++;
                    }
                }
                var returnCities=[];
                for(var city in cities){
                    returnCities.push(city);
                }
                callback(returnCities);
            });
        }
    }
})();