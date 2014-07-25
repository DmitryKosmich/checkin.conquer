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
                callback(data);
            }, "json");
        },

        getUser: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "?oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(data);
            }, "json");
        },

        setCheckinCount: function (id, callback){
            FOURSQUARE.getCheckins(id, function(data){
                callback(data.response.checkins.count);
            });
        },

        getVisitedCountries: function (id, callback){
            var CHECKIN_LIMIT = 250;
            var CHECKIN_OFFSET = 250;
            sessionStorage.CURRENT_COUNTRY_CODES = '';

            this.setCheckinCount(id, function(count){
                for(var i = 0; i <= count/CHECKIN_OFFSET; i++){
                    FOURSQUARE.getCheckinsWithParams(id, CHECKIN_LIMIT, CHECKIN_OFFSET*i, function(data){
                        if('' === String(sessionStorage.CURRENT_COUNTRY_CODES)) {
                            sessionStorage.CURRENT_COUNTRY_CODES = convertChekinsToCountryCodes(data);
                        }else{
                            sessionStorage.CURRENT_COUNTRY_CODES = convertChekinsToCountryCodes(data)+'' +
                                ','+String(sessionStorage.CURRENT_COUNTRY_CODES);
                        }
                        callback(String(sessionStorage.CURRENT_COUNTRY_CODES).split(','));
                    });
                }
            });
        }
    }
})();