
window.onload = function() {
    foursquare.getVisitedCountries('self',function(data){
        var countries = createCountryObject(data);
        createTable(countries);
    })
};

function createCountryObject(data){
    var countries = [];

    for(var i = 0; i < data.length; i++){
        countries[data[i]] = countries[data[i]]==undefined?1:countries[data[i]]+1;
    }
    return countries;
}

function createTable(countries){
    for(var country in countries){
        showCountry(getCountryName(country.toUpperCase()), countries[country]);
    }
}

function showCountry(name, checkinCount) {
    $( ".countries" ).append(
            '<tr class="row">' +
            '<td></td>' +
            '<td>'+name+'</td>' +
            '<td>'+checkinCount+'</td>' +
            '</tr>' );
}
