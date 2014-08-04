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

    function setTwoRegionsColor(obj1, obj2){
        var colorData = sample_data;
        for (var cc in colorData){
            if(isExist(cc, obj2.regions)){
                colorData[cc]=obj2.color;
            }else{
                if(isExist(cc, obj1.regions)){
                    colorData[cc]=obj1.color;
                }
            }
        }
        jQuery('#vmap').vectorMap('set', 'colors', colorData);
    }

    function init(params) {
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
                    if(params.isRegionClick==true){
                        getCountryDialogInfo({ "code" : code});
                    }
                }
            });
    }

    function update(userId, color){
        DB.checkin.getAll(userId, function(checkins){
            var regions = getRegions(checkins);
            setColor(config.BG_COLOR);
            if(color){
                setRegionColor(regions, color);
            }else{
                setRegionColor(regions, config.VISITED_COUNTRY_COLOR);
            }
        });
    }

    function updateCompetition(userId1, color1, userId2, color2){
        DB.checkin.getAll(userId1, function(checkins1){
            var obj1 = {
                color: color1,
                regions: getRegions(checkins1)
            };
            DB.checkin.getAll(userId2, function(checkins2){
                var obj2 = {
                    color: color2,
                    regions: getRegions(checkins2)
                };
                setTwoRegionsColor(obj1, obj2);
            });
        });
    }

    function getRegions(checkins){

        var regions = [];
        for(var i = 0; i < checkins.length; i++){
            regions.push(checkins[i].cc);
        }
        var tempRegions = removeRepetition(regions);
        var result = [];
        for(var i = 0; i < tempRegions.length; i++){
            result.push(tempRegions[i].value);
        }
        return regions;
    }

    return  {
        init : init,

        setColor: setColor,

        setRegionColor: setRegionColor,

        update: update,

        updateCompetition: updateCompetition
    }
})();


