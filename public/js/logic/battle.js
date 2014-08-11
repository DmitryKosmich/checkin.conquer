
window.onload = function() {

    $(document).ready(function () {
        setLocalization();
        map.init({isRegionClick: false});
        map.setColor(config.BG_COLOR);
        DB.user.search({FQUserId: getURLParameter('id')}, function(err, users){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(users[0]){
                    $('.vs_title').append(users[0].name+' '+users[0].surname  );
                    fullUserForm('f', users[0]);
                }else{
                    console.error('ERROR: user '+ getURLParameter('id')+' not founded!');
                }
            }
        });
        DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(err, users){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                fullUserForm('self', users[0]);
            }
        });
        map.updateCompetition(getURLParameter('id'), config.FRIEND_COLOR, SESSION.get("currentUserId"), config.VISITED_COUNTRY_COLOR);
        setDesignation();
        $("#loadingImage").fadeOut("slow");
    });
};

function setDesignation() {
    $( "#friend_color" ).attr('style', 'background-color: '+config.FRIEND_COLOR+';');
    $( "#join_color" ).attr('style', 'background-color: '+config.JOIN_COUNTRY_COLOR+';');
    $( "#user_color" ).attr('style', 'background-color: '+config.VISITED_COUNTRY_COLOR+';');
    $( "#not_captured_color" ).attr('style', 'background-color: '+config.BG_COLOR+';');
}

function fullUserForm(flag, user){
    DB.checkin.getAll(user.FQUserId, function(err, checkins){
        if(err) {
            ALERT.show(err, ALERT_TYPE.DANGER);
        }else{
            if(checkins[0]){
                var regions = getRegions(checkins);
                var returnCountries = '';
                var startIndex = 0;
                appendCountry(startIndex, regions.length-1, flag, regions, returnCountries);
                DB.user.search({FQUserId:user.FQUserId}, function(err, users){
                    if(err){
                        ALERT.show(err, ALERT_TYPE.DANGER);
                    }else{
                        if(users[0]){
                            $( '#'+flag+"_points" ).val(users[0].points);
                        }
                    }
                });
            }
        }
    });
}

function appendCountry(n, m, flag, regions, returnCountries){
    DB.country.search({cc: regions[n]}, function(err, countries){
        if(err) {
            ALERT.show(err, ALERT_TYPE.DANGER);
        }else{
            if(countries[0]){
                returnCountries += countries[0].name+', ';
            }
            if(n == m){
                $( '#'+flag+"_countries" ).append(returnCountries.substr(0,returnCountries.length-2));
                return '';
            }else{
                appendCountry(++n, m, flag, regions, returnCountries);
            }
        }
    });
}