
window.onload = function() {

    $(document).ready(function () {
        authPopUpHide();
        countryPopUpHide();
        setLocalization();
        setNavItem('home_map');
        map.init({isRegionClick: true});
        map.setColor(config.BG_COLOR);
        AUTH.setToken();
        if(SESSION.get('ACCESS_TOKEN')!= null){
            userInit();
            map.update();
        }
    });
};

function userInit(){
    if(SESSION.get('currentUserId')!= null){
        updateAll();
    }else{
        FOURSQUARE.getUser('self', function(err, user){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                SESSION.set("currentUserId", user.id);
                synchUpdate();
            }
        });
    }
}
function updateAll(){
    DB.user.search({FQUserId: SESSION.get('currentUserId')}, function(err, users){
        if(err){
            ALERT.show(err, ALERT_TYPE.DANGER);
        }else{
            if(users[0]){
                if(((new Date().getTime() / 1000) - users[0].lastUpdate)>config.UPDATE_INTERVAL){
                    synchUpdate();
                }else{
                    $("#loadingImage").fadeOut("slow");
                }
            }else{
                SYNCHRONIZER.update.user('self', function(err){
                    if(err){
                        ALERT.show(err, ALERT_TYPE.DANGER);
                    }else{
                        synchUpdate();
                    }
                });
            }
        }
    });
}

function synchUpdate(){
    SYNCHRONIZER.update.all(function(err, data){
        if(err){
            ALERT.show("Update is completed with error!", ALERT_TYPE.DANGER);
        }else{
            map.update();
            $("#loadingImage").fadeOut("slow");
            ALERT.show("Update is completed!", ALERT_TYPE.SUCCESS);
        }
    });
}