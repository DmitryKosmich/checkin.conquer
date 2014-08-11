'use strict';

$(document).ready(function () {
    setLocalization();
    var params = {};
    params.FQUserId = SESSION.get("currentUserId");


    if(getURLParameter('countryCode')!='null'){
        params.cc = getURLParameter('countryCode');
    }
    if(getURLParameter('city')!='null'){
        params.city = getURLParameter('city');
    }
    if(getURLParameter('id')!='null'){
        params.FQUserId = getURLParameter('id');
    }

    DB.album.search(params, function(err, albums){
        if(err) {
            ALERT.show(err, ALERT_TYPE.DANGER);
            $("#loadingImage").fadeOut("slow");
        }else{
            showAlbums(albums, params);
            $("#loadingImage").fadeOut("slow");
        }
    });
});

function showAlbums(albums, params){

    for(var i = 0; i < albums.length; i++){
        $("#albums").append(
                '<div class="albumWrapper">' +
                    '<div class="album">'+
                    '<a href="/album?id='+albums[i]._id+'"><img  class="albumImage" src="'+albums[i].previewSrc+'"></a>'+
                    '</div>' +
                    '<div class="albumTitle">'+albums[i].name+'</div>'+
                '</div>'
        );
    }
    if(params.FQUserId == SESSION.get('currentUserId')){
        if(params.cc || params.city){
            $("#albums").append(
                    '<div class="albumWrapper">' +
                    '<div class="album">'+
                    '<a href="#" onclick="countryPopUpShow()"><img  class="albumImage" src="/images/add_album.png"></a>'+
                    '</div>' +
                    '</div>'
            );
        }
    }
}

function addAlbum(){
    if($("#userPicasaId").val() && $("#albumPicasaId").val()) {
        var newAlbum = {
            name: $("#albumName").val(),
            userPicasaId: $("#userPicasaId").val(),
            albumPicasaId: $("#albumPicasaId").val()
        };

        if (getURLParameter('countryCode')) {
            newAlbum.cc = getURLParameter('countryCode');
        } else {
            newAlbum.city = getURLParameter('city');
        }

        SYNCHRONIZER.add.album(newAlbum, function (err) {
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }
            redirectBack();
        });
        countryPopUpHide();
    }else{
        ALERT.show('Fields should not be empty!', ALERT_TYPE.WARNING);
    }
}

function redirectBack(){
    var address = '';
    if("null"==getURLParameter('countryCode')){
        address = 'city='+getURLParameter('city');
    }else{
        address = 'countryCode='+getURLParameter('countryCode');
    }
    window.location.href = '/albums?'+address;
}