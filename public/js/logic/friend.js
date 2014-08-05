
window.onload = function() {

    $(document).ready(function () {
        setLocalization();
        map.init({isRegionClick: false});
        map.setColor(config.BG_COLOR);
        DB.user.search({FQUserId: getURLParameter('id')}, function(users){
            if(users[0]){
                $('.vs_title').append(users[0].name+' '+users[0].surname  );
                fullUserForm('f', users[0]);
            }else{
                console.error('ERROR: user '+ getURLParameter('id')+' not founded!');
            }
        });
        DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(users){
            fullUserForm('self', users[0]);
        });
        map.updateCompetition(getURLParameter('id'), config.FRIEND_COLOR, SESSION.get("currentUserId"), config.VISITED_COUNTRY_COLOR);
        setDesidnation();
        $("#loadingImage").fadeOut("slow");
    });
};

function setDesidnation() {
    $( "#friend_color" ).attr('style', 'background-color: '+config.FRIEND_COLOR+';');
    $( "#join_color" ).attr('style', 'background-color: '+config.JOIN_COUNTRY_COLOR+';');
    $( "#user_color" ).attr('style', 'background-color: '+config.VISITED_COUNTRY_COLOR+';');
    $( "#not_captured_color" ).attr('style', 'background-color: '+config.BG_COLOR+';');
}

function fullUserForm(flag, user){
    DB.checkin.getAll(user.FQUserId, function(checkins){
        if(checkins[0]){
            var regions = getRegions(checkins);
            var returnCountries = '';
            var startIndex = 0;
            appendCountry(startIndex, regions.length-1, flag, regions, returnCountries);
            $( '#'+flag+"_checkins" ).val(checkins.length);
        }
    });
}

function appendCountry(n, m, flag, regions, returnCountries){
    DB.country.search({cc: regions[n]}, function(countries){
    if(countries[0]){
        returnCountries += countries[0].name+', ';
    }
    if(n == m){
        console.log(returnCountries);
        $( '#'+flag+"_countries" ).append(returnCountries.substr(0,returnCountries.length-2));
        return '';
    }else{
        appendCountry(++n, m, flag, regions, returnCountries);
    }
});

}