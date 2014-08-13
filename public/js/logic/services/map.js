
var MAP =  (function() {

    'use strict';

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
        var flag = {
            isBelongsToFirst: false,
            isBelongsToSecond: false
        };
        for (var cc in colorData){
            if(isExist(cc, obj1.regions)){
                flag.isBelongsToFirst = true;
            }
            if(isExist(cc, obj2.regions)){
                flag.isBelongsToSecond = true;
            }
            if(flag.isBelongsToFirst == true && flag.isBelongsToSecond == true){
                colorData[cc]=config.JOIN_COUNTRY_COLOR;
            }
            if(flag.isBelongsToFirst == true && flag.isBelongsToSecond == false){
                colorData[cc]=obj1.color;
            }
            if(flag.isBelongsToFirst == false && flag.isBelongsToSecond == true){
                colorData[cc]=obj2.color;
            }
            flag.isBelongsToFirst = false;
            flag.isBelongsToSecond = false;
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
        DB.checkin.getAll(userId, function(err, checkins){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                var regions = getRegions(checkins);
                setColor(config.BG_COLOR);
                if(color){
                    setRegionColor(regions, color);
                }else{
                    setRegionColor(regions, config.VISITED_COUNTRY_COLOR);
                }
            }
        });
    }

    function updateCompetition(userId1, color1, userId2, color2){
        DB.checkin.getAll(userId1, function(err, checkins1){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                var obj1 = {
                    color: color1,
                    regions: getRegions(checkins1)
                };
                DB.checkin.getAll(userId2, function(err, checkins2){
                    if(err) {
                        ALERT.show(err, ALERT_TYPE.DANGER);
                    }else{
                        var obj2 = {
                            color: color2,
                            regions: getRegions(checkins2)
                        };
                        setTwoRegionsColor(obj1, obj2);
                    }
                });
            }
        });
    }

    return  {
        init : init,

        setColor: setColor,

        setRegionColor: setRegionColor,

        update: update,

        updateCompetition: updateCompetition
    }
})();


