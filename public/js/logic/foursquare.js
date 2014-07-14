'use strict';

var foursquare =  (function() {

    return  {

        getCheckins: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/checkins?limit=250&oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(data);
            }, "json");
        },

        getFriends: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/friends?oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(data);
            }, "json");
        },

        getUser: function getUser(id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "?oauth_token=" + config.ACCESS_TOKEN + "&v=" + getNowDate(), function (data) {
                callback(data);
            }, "json");
        }
}
})();