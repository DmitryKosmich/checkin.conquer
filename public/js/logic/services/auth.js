'use strict';

var AUTH = (function(){

    var doAuthRedirect = function () {
        var url = 'https://foursquare.com/oauth2/authenticate?' +
            'client_id=' + config.CLIENT_ID+
            '&response_type=token' +
            '&redirect_uri='+config.REDIRECT_URL;

        window.location.href = url;
    };

    return {

        setToken: function () {
            console.log(config.ACCESS_TOKEN);
            if(config.ACCESS_TOKEN == 'undefined'){
                if ($.bbq.getState('access_token')) {
                    SESSION.set('ACCESS_TOKEN', $.bbq.getState('access_token'));
                    config.ACCESS_TOKEN=$.bbq.getState('access_token');
                    $.bbq.pushState({}, 2);
                }else{
                    if ($.bbq.getState('error')) {
                        ALERT.show('ERROR: getting access token', ALERT_TYPE.DANGER);
                    }else {
                        setTimeout(function(){
                            if(config.ACCESS_TOKEN == 'undefined'){
                                authPopUpShow();
                            }
                        }, 3000);
                        doAuthRedirect();
                    }
                }
            }
        }
    }
})();