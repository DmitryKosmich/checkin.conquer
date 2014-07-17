
function isExist(elem, arr){
    for(var e in arr){
        if(arr[e]==elem){
            return true;
        }
    }
    return false;
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

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
    );
}

function convertChekinsToCountryCodes(data){
    var ccs = [];
    for(var cc in data.response.checkins.items){
        ccs.push(data.response.checkins.items[cc].venue.location.cc.toLowerCase());
    }
    return ccs;
}

function setNavItem(id){
    $( "#"+id ).find( '.active' ).removeClass( 'active' );
    $( "#"+id ).addClass( 'active' );
}

function setFormat(number){
    number = parseInt(number);
    return number.formatMoney(0,'\'','.');
}

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

function wwnaviGetLang(){
    return (navigator.userLanguage||navigator.browserLanguage||navigator.language||'en').substr(0,2);
}

function setLocalization(){
    $(function(){
        var opts = { language: "ru", pathPrefix: "/js/localize", skipLanguage: ["en", "en-US"] };
        $("[data-localize]").localize("language", opts);
    })
}