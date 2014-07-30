'use strict';

$(document).ready(function () {
    setLocalization();
    FOURSQUARE.getUser('self', function(userData){
        var album = {
            userId: userData.response.user.id,
            countryCode: null==getURLParameter('countryCode')?'null':getURLParameter('countryCode'),
            city: null==getURLParameter('city')?'null':getURLParameter('city')
        };

        ALBUM.getAll(album, function(albumsData){
            showAlbums(albumsData.albums);
        });
    });
});

function showAlbums(albums){
    for(var i = 0; i < albums.length; i++){
        var album = {};
        album.name =albums[i].name==undefined?"No name":albums[i].name;
        album.id = albums[i]._id;
        PICASA.getAlbumPreviewUrl(albums[i].userPicasaId, albums[i].albumPicasaId, album , function(album){
            $("#albums").append(
                '<div class="album">'+
                    '<a href="/album?id='+album.id+'"><img  class="albumImage" src="'+album.url+'"></a>'+
                    '<div class="albumTitle">'+album.name+'</div>'+
                '</div>'
            );
        });
    }
}

function addAlbum(){
    FOURSQUARE.getUser('self', function(userData){
        if($("#userPicasaId").val() && $("#userPicasaId").val()){
            var countryCode = null==getURLParameter('countryCode')?'null':getURLParameter('countryCode');
            var city = null==getURLParameter('cityId')?'null':getURLParameter('city');
            var newAlbum = {
                name : $("#albumName").val(),
                userId: userData.response.user.id,
                userPicasaId: $("#userPicasaId").val(),
                albumPicasaId: $("#albumPicasaId").val(),
                countryCode: countryCode,
                city: city
            };
            if(VALIDATION.isLength(newAlbum.albumPicasaId, 19)){
                ALBUM.add(newAlbum, function(){
                    redirectBack();
                });
            }
        }
    });
    countryPopUpHide();
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