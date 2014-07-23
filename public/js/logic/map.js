'use strict';

var map =  (function() {

    function setColor(color){
        var colorData = sample_data;
        for (var cc in colorData){
            colorData[cc]=color;
        }
        jQuery('#vmap').vectorMap('set', 'colors', colorData);
    }

    function setRegionColor(regions, newColor){
        var colorData = sample_data;
        for (var cc in colorData){
            if(isExist(cc, regions)){
                colorData[cc]=newColor;
            }
        }
        jQuery('#vmap').vectorMap('set', 'colors', colorData);
    }

    function setRegionColorFromDB( newColor){
        foursquare.getUser('self', function(data){
            country.getAll(data.response.user.id, function(data){
                var regions = [];
                for(var index = 0; index< data.length; index++){
                    regions.push(data[index].code);
                }
                map.setRegionColor(regions, newColor);
            });
        });
    }

    function initMap() {
        jQuery('#vmap').vectorMap(
            {
                map: 'world_en',
                backgroundColor: null,
                color: '#ffffff',
                hoverOpacity: 0.7,
                selectedColor: '#104a5a',
                enableZoom: true,
                showTooltip: true,
                values: sample_data,
                scaleColors: ['#C8EEFF', '#006491'],
                normalizeFunction: 'polynomial',
                borderColor: null,
                borderOpacity: 0.0,
                borderWidth: 1,
                hoverColor: '#c9dfaf',
                selectedRegion: null,
                onRegionClick: function (element, code, region) {
                    getCountryDialogInfo({ "code" : code});
                }
            });
    }

    function update(){
        foursquare.getVisitedCountries('self', function(data){
            setColor(config.BG_COLOR);
            setRegionColor(data, config.VISITED_COUNTRY_COLOR);
            setRegionColorFromDB( config.VISITED_COUNTRY_COLOR_BD);
        });
    }
    return  {
        initMap : initMap,

        setColor: setColor,

        setRegionColor: setRegionColor,

        setRegionColorFromDB: setRegionColorFromDB,

        update: update
    }
})();


