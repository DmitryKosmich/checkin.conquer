
window.onload = function() {

    $(document).ready(function () {
        map.initMap();
        map.setColor(config.BG_COLOR);
        foursquare.getUser(getURLParameter('id'), function(data){
            console.log(data);
        });
    });
};