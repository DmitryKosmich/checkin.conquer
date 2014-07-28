'use strict';

$(document).ready(function () {
    ALBUM.get(getURLParameter('id'), function(albumData){
        init(albumData.album.userPicasaId, albumData.album.albumPicasaId);
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
    ALBUM.get(getURLParameter('id'), function(albumData){
        ALBUM.delete(getURLParameter('id'), function(){
            redirectBack(albumData);
        });
    });
}

function redirectBack(currentAlbum){
    var address = '';
    if("null"!=currentAlbum.album.countryCode){
        address = 'countryCode='+currentAlbum.album.countryCode;
    }else{
        address = 'city='+currentAlbum.album.city;
    }
    window.location.href = '/albums?'+address;
}