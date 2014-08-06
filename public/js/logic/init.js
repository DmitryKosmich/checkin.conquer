
window.onload = function() {

    $(document).ready(function () {
        authPopUpHide();
        countryPopUpHide();
        setLocalization();
        setNavItem('home');
        map.init({isRegionClick: true});
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
    if(SESSION.get('currentUserId')!= null){
        updateAll();
    }else{
        FOURSQUARE.getUser('self', function(err, user){
            if(err){
                callback(err);
            }else{
                SESSION.set("currentUserId", user.id);
                synchUpdate();
            }
        });
    }
}
function updateAll(){
    DB.user.search({FQUserId: SESSION.get('currentUserId')}, function(users){
        if(users[0]){
            if(((new Date().getTime() / 1000) - users[0].lastUpdate)>config.UPDATE_INTERVAL){
                synchUpdate();
            }
            $("#loadingImage").fadeOut("slow");
        }else{
            SYNCHRONIZER.update.user('self', function(err){
                if(err){
                    alert('ERROR: updating user');
                }else{
                    synchUpdate();
                }
            });
        }
    });
}

function synchUpdate(){
    SYNCHRONIZER.update.all(function(err, data){
        if(err){
            ALERT.show("Update is completed with error!", ALERT_TYPE.danger);
        }else{
            map.update();
            $("#loadingImage").fadeOut("slow");
            ALERT.show("Update is completed!", ALERT_TYPE.success);
        }
    });
}