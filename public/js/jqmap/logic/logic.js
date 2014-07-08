var config = {
    token: '',
    redirect: document.URL
};

window.onload = function() {

    $(document).ready(function () {
        initMap();
        setBlackColor();
        setToken();
        getCheckins();
    });
};

function initMap() {
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
                /*var message = 'You clicked "'
                    + region
                    + '" which has the code: '
                    + code.toUpperCase();

                alert(message);*/
            }
        });
}

function setToken() {
    if ($.bbq.getState('access_token')) {
        config.token = $.bbq.getState('access_token');
        $.bbq.pushState({}, 2)
    } else if ($.bbq.getState('error')) {
    } else {
        setTimeout(function(){
            if(config.token == ''){
                $( "#dialog" ).dialog();
            }

        }, 1000);
        doAuthRedirect();
    }
}

function getCheckins() {
    var nowDate = getNowDate();
    $.get("https://api.foursquare.com/v2/users/self/checkins?oauth_token=" + config.token + "&v="+nowDate, function (data) {
        console.log(data);
        var ccs = ccParser(data);
        setRegionColor(ccs);
    }, "json");
}


function doAuthRedirect() {
    var url = 'https://foursquare.com/oauth2/authenticate?' +
        'client_id=CN23WK1RKT1VL0VPZM2OTEGVKYMH0PYXJPOW02HOOJ2YYAXV' +
        '&response_type=token' +
        '&redirect_uri='+config.redirect;

    window.location.href = url;
}

function setRegionColor(ccs){
    var colorData = sample_data;
    for (var cc in colorData){
        if(isExist(cc, ccs)){
            colorData[cc]='#29c5e6';

        }else{
            colorData[cc]='#444';
        }
    }
    jQuery('#vmap').vectorMap('set', 'colors', colorData);
}

function ccParser(data){
    var ccs = [];
    for(var cc in data.response.checkins.items){
        ccs.push(data.response.checkins.items[cc].venue.location.cc.toLowerCase());
    }
    return ccs;
}

function isExist(elem, arr){
    for(var e in arr){
        if(arr[e]==elem){
            return true;
        }
    }
    return false;
}

function setBlackColor(){
    var colorData = sample_data;
    for (var cc in colorData){
        colorData[cc]='#444'
    }
    jQuery('#vmap').vectorMap('set', 'colors', colorData);
}

function getNowDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    return ''+yyyy+mm+dd;
}