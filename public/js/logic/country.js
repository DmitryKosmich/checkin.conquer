
function getCountryDialogInfo(country){
    DB.country.search({cc: country.code}, function(counties){
        if(counties[0]){
            fillCountryDialog(counties[0]);
            countryPopUpShow();
        }else{
            SYNCHRONIZER.add.country({cc: country.code}, function(err, country){
                if(err){
                    console.error("ERROR: adding country");
                }else{
                    fillCountryDialog(country);
                    countryPopUpShow();
                }
            });
        }
    });
}

function fillCountryDialog(country){
    $( "#country_name" ).html('').append(country.name);
    $( "#country_capital" ).html('').append(country.capital);
    $( "#country_region" ).html('').append(country.region);
    $( "#country_subregion" ).html('').append(country.subregion);
    $( "#country_population" ).html('').append(setFormat(country.population)=='0'?'':setFormat(country.population));
    $( "#country_area" ).html('').append(setFormat(country.area)=='0'?'':setFormat(country.area));
    $( "#country_gini" ).html('').append(country.gini);
    $( "#country_flag_popup" ).attr( 'src', country.flagSrc);
    DB.checkin.search({cc: country.cc, FQUserId: SESSION.get('currentUserId')}, function(checkins){
        $( "#addCountry").html('');
        $( "#deleteCountry").html('');

        if(checkins[0] == null){
            $( "#addCountry" ).html('').append( '<a href="#" class="glyphicon glyphicon-map-marker"  onclick="addCountry(\''+country.cc+ '\')" ></a>' );
        }else{
            for(var i = 0; i < checkins.length; i++){
                if(checkins[i].isFQ == false){
                    $( "#deleteCountry" ).html('').append( '<a href="#" class="glyphicon glyphicon-trash" onclick="deleteCountry(\''+country.cc+'\')" ></a>' );
                    break;
                }
            }
        }
    });
}

function addCountry(cc){
    DB.checkin.search({cc: cc, isFQ: false, FQUserId: SESSION.get('currentUserId')}, function(checkins){
        if(checkins[0] == null){
            DB.country.search({cc: cc},function(countries){
                if(countries[0]){
                    SYNCHRONIZER.add.checkin({cc: cc, isFQ: false}, function(err){
                        if (err) console.error('ERROR: adding checkin');
                        map.update();
                    })
                }else{
                    SYNCHRONIZER.add.country({cc: cc}, function(err){
                        if (err) console.error('ERROR: adding country');
                        SYNCHRONIZER.add.checkin({cc: cc, isFQ: false}, function(err){
                            if (err) console.error('ERROR: adding checkin');
                            map.update();
                        });
                    });
                }
            });
        }
    });
    countryPopUpHide();
}

function deleteCountry(code){
    DB.checkin.search({cc: code, isFQ: false, FQUserId: SESSION.get('currentUserId')}, function(checkins){
        if(checkins[0]){
            DB.checkin.delete(checkins[0]._id, function(){
                map.update();
            });
        }
    });
    countryPopUpHide();
}

function closeCountryDialog(){
    countryPopUpHide();
    //map.update();
}