'use strict';

var allCountriesInfo = [];
var conquerInfo = {
    name: 'My ownership',
    capital: '-',
    flagImage: 'https://irs0.4sqi.net/img/user/30x30/blank_boy.png',
    population: 0,
    area: 0,
    checkinsCount: 0
};

var endIndicator = {
    length: 0,
    currentIndex: 0
};

window.onload = function() {
    setLocalization();
    setNavItem('countries');
    foursquare.getVisitedCountries('self',function(data){
        var countries = createCountryObject(data);
        fillAllCountryInfo(countries);
    })
};

function createCountryObject(data){
    var countriesObj = {};
    var countriesArr = [];

    for(var i = 0; i < data.length; i++){
        if(countriesObj[data[i]] == undefined){
            countriesObj[data[i]] = 1;
        }else{
            countriesObj[data[i]]+=1;
        }
    }

    for(var cc in countriesObj){
        countriesArr.push({countryCode: cc, checkinsCount: countriesObj[cc]});
    }
    return countriesArr;
}

function fillAllCountryInfo(countries){
    endIndicator.length = countries.length;
    for(var i = 0; i < countries.length; i++){
        getCountryInfo( countries[i]);
    }
}

function getCountryInfo(country){
    $.get("http://restcountries.eu/rest/v1/alpha/" + country.countryCode, function (data) {
        data.checkinsCount = country.checkinsCount;
        data.flagImage = "http://www.geonames.org/flags/m/"+data.alpha2Code.toLowerCase()+".png";
        readData(data);
    }, "json");
}

function readData(data){
    allCountriesInfo.push(data);
    addResultInfo(data);
    endIndicator.currentIndex +=1;
    if(endIndicator.length == endIndicator.currentIndex){
        createTable();
    }
}

function createTable(){
    for(var i = 0; i < allCountriesInfo.length; i++){
        showCountry(allCountriesInfo[i], '');
        if(i == allCountriesInfo.length-1){
            foursquare.getUser('self', function(data){
                conquerInfo.flagImage = data.response.user.photo.prefix+'30x30'+data.response.user.photo.suffix;
                showCountry(conquerInfo, 'mainColor');
            });
        }
    }
}

function showCountry(data, colorClass) {
    var isDialog='';
    if(colorClass==''){
        isDialog = 'data-reveal-id="myModal" onclick=getCountryDialogInfo("'+data.alpha2Code.toLowerCase()+'")';
    }
    $( ".countries" ).append(
            '<tr class="row">' +
            '<td><a href="#" '+isDialog+'><img id="country_flag" src="'+data.flagImage+'" /></a></td>' +
            '<td class="'+colorClass+'" >'+data.name+'</td>' +
            '<td class="'+colorClass+'">'+data.capital+'</td>' +
            '<td class="'+colorClass+' text-right">'+setFormat(data.population)+'</td>' +
            '<td class="'+colorClass+' text-right">'+setFormat(data.area)+'</td>' +
            '<td class="'+colorClass+' text-center">'+data.checkinsCount+'</td>' +
            '</tr>' );
}

function addResultInfo(data){
    conquerInfo.area+=data.area;
    conquerInfo.population+=data.population;
    conquerInfo.checkinsCount+=data.checkinsCount;
}

function getCountryDialogInfo(countryCode){
    $.get("http://restcountries.eu/rest/v1/alpha/" + countryCode, function (data) {
        data.flagImage = "http://www.geonames.org/flags/x/"+data.alpha2Code.toLowerCase()+".gif";
        fillCountryDialog(data);
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
}