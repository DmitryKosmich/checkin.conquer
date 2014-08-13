
window.onload = function() {

    $(document).ready(function () {
        setLocalization();
        MAP.init({isRegionClick: false});
        MAP.setColor(config.BG_COLOR);

        DB.user.search({FQUserId: getURLParameter('id')}, function(err, users){
            ERROR.errorWrapper(err, users, function(users){
                if(users){
                    $('.vs_title').append(users[0].name+' '+users[0].surname  );
                    fullUserForm('f', users[0]);
                }
            });
        });

        DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(err, users){
            ERROR.errorWrapper(err, users, function(users){
                if(users){
                    fullUserForm('self', users[0]);
                }
            });
        });

        MAP.updateCompetition(getURLParameter('id'), config.FRIEND_COLOR, SESSION.get("currentUserId"), config.VISITED_COUNTRY_COLOR);
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
        ERROR.errorWrapper(err, checkins, function(checkins){
            if(checkins){
                var regions = getRegions(checkins);
                var returnCountries = '';
                var startIndex = 0;
                appendCountry(startIndex, regions.length-1, flag, regions, returnCountries);
                DB.user.search({FQUserId:user.FQUserId}, function(err, users){
                    ERROR.errorWrapper(err, users, function(users){
                        if(users){
                            fillUserFields(flag, users[0]);
                        }
                    });
                });
            }
        });
    });
}

function fillUserFields(flag, user){
    $( '#'+flag+'_points' ).val(setFormat(user.points));

    STATISTICS.getCountriesCount(user.FQUserId, function(count){
        $('#'+flag+'_countries_count').val(count);
    });
    STATISTICS.getCitiesCount(user.FQUserId, function(count){
        $('#'+flag+'_cities_count').val(setFormat(count));
    });
    STATISTICS.getArea(user.FQUserId, function(area){
        $('#'+flag+'_area').val(setFormat(area));
    });
    STATISTICS.getPopulation(user.FQUserId, function(population){
        $('#'+flag+'_population').val(setFormat(population));
    });

}

function appendCountry(n, m, flag, regions, returnCountries){
    DB.country.search({cc: regions[n]}, function(err, countries){
        ERROR.errorWrapper(err, countries, function(countries){
            if(countries){
                returnCountries += countries[0].name+', ';
            }
            if(n == m){
                $( '#'+flag+"_countries" ).append(returnCountries.substr(0,returnCountries.length-2));
                return '';
            }else{
                appendCountry(++n, m, flag, regions, returnCountries);
            }
        });
    });
}