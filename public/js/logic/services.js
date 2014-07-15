
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

function setCurrentNavItem(id){
    sessionStorage.CURRENT_NAV_ITEM = id;
}

function setNavItem(id){
    $( "#"+id ).find( '.active' ).removeClass( 'active' );
    $( "#"+id ).addClass( 'active' );
}