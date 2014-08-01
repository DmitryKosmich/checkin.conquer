'use strict';

var RESTCOUNTRIES = (function(){

    return {
        getCountryByCC: function(cc, callback){
            $.get("http://restcountries.eu/rest/v1/alpha/" + cc, function (data) {
                callback(null, data);
            }, "json");
        }
    }
})();