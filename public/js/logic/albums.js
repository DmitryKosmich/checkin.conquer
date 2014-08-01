'use strict';

$(document).ready(function () {
    setLocalization();
    var params = {};
    params.FQUserId = SESSION.get("currentUserId");

    if(getURLParameter('countryCode')){
        params.cc = getURLParameter('countryCode');
    }else{
        params.city = getURLParameter('city');
    }

    DB.album.search(params, function(albums){
        showAlbums(albums);
    });
});

function showAlbums(albums){
    for(var i = 0; i < albums.length; i++){
        $("#albums").append(
                '<div class="album">'+
                '<a href="/album?id='+albums[i]._id+'"><img  class="albumImage" src="'+albums[i].previewSrc+'"></a>'+
                '<div class="albumTitle">'+albums[i].name+'</div>'+
                '</div>'
        );
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
            if(err) alert('ERROR: album adding');
            redirectBack();
        });
        countryPopUpHide();
    }else{
        alert("Fields should not be empty!");
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