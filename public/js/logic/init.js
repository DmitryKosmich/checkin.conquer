
window.onload = function() {

    $(document).ready(function () {
        authPopUpHide();
        countryPopUpHide();
        setLocalization();
        setNavItem('home');
        map.init();
        map.setColor(config.BG_COLOR);
        setToken();
        userInit();
        map.update();
    });
};

function setToken() {
    if(config.ACCESS_TOKEN == 'undefined'){
        if ($.bbq.getState('access_token')) {
            SESSION.set('ACCESS_TOKEN', $.bbq.getState('access_token'));
            config.ACCESS_TOKEN=$.bbq.getState('access_token');
            $.bbq.pushState({}, 2);
        }else{
            if ($.bbq.getState('error')) {
                alert('ERROR: getting access token');
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

function doAuthRedirect() {
    var url = 'https://foursquare.com/oauth2/authenticate?' +
        'client_id=' + config.CLIENT_ID+
        '&response_type=token' +
        '&redirect_uri='+config.REDIRECT_URL;

    window.location.href = url;
}

function userInit(){
    if(SESSION.get('currentUserId')!='null'){
        updateAll();
    }else{
        FOURSQUARE.getUser('self', function(err, user){
            if(err){
                callback(err);
            }else{
                SESSION.set("currentUserId", user.id);
                updateAll();
            }
        });
    }
}
function updateAll(){
    DB.user.search({FQUserId: SESSION.get('currentUserId')}, function(users){
        if(users[0]){
            console.log(((new Date().getTime() / 1000) - users[0].lastUpdate));
            if(((new Date().getTime() / 1000) - users[0].lastUpdate)>config.UPDATE_INTERVAL){
                console.log("sssss");
                SYNCHRONIZER.update.all(function(err){
                    if(err){
                        console.log('ERROR: updating base ');
                    }else{
                        console.log('All base updated');
                    }
                });
            }
        }
    });
}