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
            setTitle(album);
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

function setTitle(album){
    if(album.cc){
        DB.country.search({cc: album.cc}, function(err, countries){
            ERROR.errorWrapper(err, countries, function(countries){
                if(countries){
                    $('#locality_title').append(": "+countries[0].name+": "+album.name);
                }
            });
        });
    }else{
        $('#locality_title').append(": "+album.city+": "+album.name);
    }
}

function redirectBack(album){
    var address = '';
    if(album.cc){
        address = 'countryCode='+album.cc;
    }else{
        address = 'city='+album.city;
    }
    window.location.href = '/albums?'+address;
}