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

    function init() {
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
                borderOpacity: 1.0,
                borderWidth: 1,
                hoverColor: '#fff',
                selectedRegion: null,
                onRegionClick: function (element, code, region) {
                    getCountryDialogInfo({ "code" : code});
                }
            });
    }

    function update(){
        DB.checkin.getAll(function(checkins){
            var regions = [];
            for(var i = 0; i < checkins.length; i++){
                regions.push(checkins[i].cc);
            }
            var tempRegions = removeRepetition(regions);
            var result = [];
            for(var i = 0; i < tempRegions.length; i++){
                result.push(tempRegions[i].value);
            }
            setColor(config.BG_COLOR);
            setRegionColor(result, config.VISITED_COUNTRY_COLOR);
        });
    }
    return  {
        init : init,

        setColor: setColor,

        setRegionColor: setRegionColor,

        update: update
    }
})();


