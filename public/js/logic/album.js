'use strict';

$(document).ready(function () {
    setLocalization();
    DB.album.get(getURLParameter('id'), function(album){
        init(album.userPicasaId, album.albumPicasaId);
        $("#loadingImage").fadeOut("slow");
    });
});

function init(userPicasaId, albumPicasaId){
    jQuery("#gallery").nanoGallery({
        kind: 'picasa',
        userID: userPicasaId,
        album: albumPicasaId,
        thumbnailWidth : 285,
        thumbnailHeight : 154,

        thumbnailHoverEffect:'borderLighter'
    });
}

function deleteAlbum(){
    DB.album.get(getURLParameter('id'), function(album){
        DB.album.delete(getURLParameter('id'), function(){
            redirectBack(album);
        });
    });
}

function redirectBack(album){
    var address = '';
    if("null"!=album.cc){
        address = 'countryCode='+album.cc;
    }else{
        address = 'city='+album.city;
    }
    window.location.href = '/albums?'+address;
}