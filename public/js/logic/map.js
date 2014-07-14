'use strict';

var map =  (function() {

    return  {
        initMap : function () {
            jQuery('#vmap').vectorMap(
                {
                    map: 'world_en',
                    backgroundColor: null,
                    color: '#ffffff',
                    hoverOpacity: 0.7,
                    selectedColor: '#666666',
                    enableZoom: true,
                    showTooltip: true,
                    values: sample_data,
                    scaleColors: ['#C8EEFF', '#006491'],
                    normalizeFunction: 'polynomial',
                    borderColor: '#818181',
                    borderOpacity: 0.85,
                    borderWidth: 1,
                    hoverColor: '#c9dfaf',
                    selectedRegion: null,
                    onRegionClick: function (element, code, region) {
                        //todo: add listener
                    }
                });
        },

        setColor: function (color){
            var colorData = sample_data;
            for (var cc in colorData){
                colorData[cc]=color;
            }
            jQuery('#vmap').vectorMap('set', 'colors', colorData);
        },

        setRegionColor: function (regions, newColor){
            var colorData = sample_data;
            for (var cc in colorData){
                if(isExist(cc, regions)){
                    colorData[cc]=newColor;
                }
            }
            jQuery('#vmap').vectorMap('set', 'colors', colorData);
        },

        setFriendRegionColor: function (friendRegions, selfRegions, friendColor, selfColor, commonColor){
            setRegionColor(friendRegions, friendColor);
            setRegionColor(selfRegions, selfColor);

            var colorData = sample_data;

            for (var cc in colorData){
                if(isExist(cc, frindRegions)&& isExist(cc, selfRegions)){
                    colorData[cc]=commonColor;
                }
            }
            jQuery('#vmap').vectorMap('set', 'colors', colorData);
        }
    }
})();


