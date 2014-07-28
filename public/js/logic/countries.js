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

var activeCC = '';

window.onload = function() {
    setLocalization();
    setNavItem('countries');
    FOURSQUARE.getVisitedCountries('self',function(countriesData){
        FOURSQUARE.getUser('self', function(userData){
            COUNTRY.getAll(userData.response.user.id, function(countryData){
                for(var index = 0; index < countryData.length; index++){
                    if(!isExist(countryData[index].code, countriesData)){
                        countriesData.push(countryData[index].code);
                    }
                }
                var countries = createCountryObject(countriesData);
                fillAllCountryInfo(countries);
            });
        });
    });
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
    FOURSQUARE.getUser('self', function(userData){
        for(var i = 0; i < allCountriesInfo.length; i++){
            showCountry(allCountriesInfo[i], '');
            if(i == allCountriesInfo.length-1){
                conquerInfo.flagImage = userData.response.user.photo.prefix+'30x30'+userData.response.user.photo.suffix;
                showCountry(conquerInfo, 'mainColor');
            }
        }
        showCities();
    });
}

function showCountry(data, colorClass) {
    var cc = colorClass=="mainColor"?'':data.alpha2Code.toLowerCase();
    var hasAlbum = colorClass=="mainColor"?'':'<a href="/albums?countryCode='+cc+'" class="glyphicon glyphicon-picture" >';
    var showCity = colorClass=="mainColor"?'': 'showCities';
    $( ".countries" ).append(
            '<tr class="row '+showCity+'" name="'+cc+'">' +
            '<td><img id="country_flag" src="'+data.flagImage+'" /></td>' +
            '<td class="'+colorClass+'" >'+data.name+'</td>' +
            '<td class="'+colorClass+'">'+data.capital+'</td>' +
            '<td class="'+colorClass+' text-right">'+setFormat(data.population)+'</td>' +
            '<td class="'+colorClass+' text-right">'+setFormat(data.area)+'</td>' +
            '<td class="'+colorClass+' text-center">'+data.checkinsCount+'</td>' +
            '<td class="'+colorClass+' text-center">'+hasAlbum+'</a></td>' +
            '</tr>' );
}

function addResultInfo(data){
    conquerInfo.area+=data.area;
    conquerInfo.population+=data.population;
    conquerInfo.checkinsCount+=data.checkinsCount;
}

//TODO rewrite function
function showCities(){
    $( ".row.showCities").click( function() {
        var thisTag = this;
        var cc = $(thisTag).attr('name');

        $( '.showCities' ).removeClass( "accordionHeaderRow" );
        $(".row.city").hide(100, function(){
            $('.row.city').remove();
        });

        if(activeCC!=cc){
            FOURSQUARE.getCitiesByCC(cc, function(data){
                $('.row.city').remove();
                console.log(data);
                for(var i=0; i < data.length; i++){
                    if(data[i]){
                        $( thisTag).after(
                                '<tr class="row city">' +
                                '<td></td>' +
                                '<td>'+data[i]+'</td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td class="mainColor text-center"><a href="/albums?city='+data[i]+'" class="glyphicon glyphicon-picture"></a></td>' +
                                '</tr>');
                        $(".row.city").hide();
                        $( ".row.city").addClass( "accordionBodyRow" );
                        if(i==data.length-1){
                            activeCC =cc;
                            $( thisTag).addClass( "accordionHeaderRow" );
                        }
                    }
                }
                $(".row.city").show(100);
            });
        }else{
            activeCC = '';
        }
    });
}