var COUNTRY = (function(){
    return {
        add : function(country, callback){
            $.post( "/country/add", {'country' : country}, function( data ) {
            }, "json");
        },

        delete : function(country, callback){
            $.post( "/country/delete", {'country' : country}, function( data ) {
            }, "json");
        },

        getAll : function(userId, callback){
            $.post( "/country/all", {"userId": userId}, function( data ) {
                callback(data);
            }, "json");
        },

        getOne : function(code, callback){
            $.post( "/country", {'country' : code}, function( data ) {
                callback(data);
            }, "json");
        }
    }
})();

function getCountryDialogInfo(country){
    $.get("http://restcountries.eu/rest/v1/alpha/" + country.code, function (data) {
        data.flagImage = "http://www.geonames.org/flags/x/"+data.alpha2Code.toLowerCase()+".gif";
        fillCountryDialog(data);
        countryPopUpShow();
    }, "json");
}

function fillCountryDialog(data){
    $( "#country_name" ).html('').append(data.name);
    $( "#country_capital" ).html('').append(data.capital);
    $( "#country_region" ).html('').append(data.region);
    $( "#country_subregion" ).html('').append(data.subregion);
    $( "#country_population" ).html('').append(setFormat(data.population));
    $( "#country_area" ).html('').append(setFormat(data.area));
    $( "#country_gini" ).html('').append(data.gini);
    $( "#country_flag_popup" ).attr( 'src', data.flagImage);

    $( "#addCountry" ).attr( 'onclick', "addCountry('"+data.alpha2Code.toLowerCase()+"')");
    $( "#deleteCountry" ).attr( 'onclick', "deleteCountry('"+data.alpha2Code.toLowerCase()+"')");
}

function addCountry(code){
    FOURSQUARE.getUser('self', function(data){
        var newCountry = {
            "code": code,
            "userId": data.response.user.id
        };
        COUNTRY.add(newCountry, function(data){});
        map.update();
    });
    countryPopUpHide();
}

function deleteCountry(code){
    FOURSQUARE.getUser('self', function(data){
        var deletedCountry = {
            "code": code,
            "userId": data.response.user.id
        };
        COUNTRY.delete(deletedCountry, function(data){});
        map.update();
    });
    countryPopUpHide();
}

function closeCountryDialog(){
    countryPopUpHide();
    //map.update();
}