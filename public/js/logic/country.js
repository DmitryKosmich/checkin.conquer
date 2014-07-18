
function getCountryDialogInfo(countryCode){
    $.get("http://restcountries.eu/rest/v1/alpha/" + countryCode, function (data) {
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
}

function countryPopUpShow(){
    $(".reveal-modal_country_popup").show();
    $(".reveal-modal-bg_country_popup").show();
}
function countryPopUpHide(){
    $(".reveal-modal_country_popup").hide();
    $(".reveal-modal-bg_country_popup").hide();
}