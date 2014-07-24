
window.onload = function() {

    $(document).ready(function () {

        authPopUpHide();
        countryPopUpHide();
        setLocalization();
        setNavItem('home');
        map.initMap();
        map.setColor(config.BG_COLOR);
        setToken();
        map.update();
    });
};

function setToken() {
    if(config.ACCESS_TOKEN == 'undefined'){
        if ($.bbq.getState('access_token')) {
            setSessionToken($.bbq.getState('access_token'));
            config.ACCESS_TOKEN=$.bbq.getState('access_token');
            $.bbq.pushState({}, 2);
        }
        else if ($.bbq.getState('error')) {
        }
        else {
            setTimeout(function(){
                if(config.ACCESS_TOKEN == 'undefined'){
                    authPopUpShow();
                }
            }, 3000);
            doAuthRedirect();
        }
    }
}

function doAuthRedirect() {
    var url = 'https://foursquare.com/oauth2/authenticate?' +
        'client_id=' + config.CLIENT_ID+
        '&response_type=token' +
        '&redirect_uri='+config.REDIRECT_URL;

    window.location.href = url;
}