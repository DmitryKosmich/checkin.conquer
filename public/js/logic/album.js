'use strict';

$(document).ready(function () {
    setLocalization();
    DB.album.get(getURLParameter('id'), function(err, album){
        if(err) {
            ALERT.show(err, ALERT_TYPE.DANGER);
            $("#loadingImage").fadeOut("slow");
        }else{
            if(album.FQUserId != SESSION.get("currentUserId")){
                $('#deleteButtonWrap').remove();
            }
            init(album.userPicasaId, album.albumPicasaId);
            $("#loadingImage").fadeOut("slow");
        }
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
    DB.album.get(getURLParameter('id'), function(err, album){
        if(err) {
            ALERT.show(err, ALERT_TYPE.DANGER);
        }else{
            DB.album.delete(getURLParameter('id'), function(err){
                if(err) {
                    ALERT.show(err, ALERT_TYPE.DANGER);
                }else{
                    redirectBack(album);
                }
            });
        }
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