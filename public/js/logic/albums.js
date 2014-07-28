'use strict';

$(document).ready(function () {
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
        var name =albums[i].name==undefined?"No name":albums[i].name;
        $("#albums").append('<p><a href="/album?id='+albums[i]._id+'">'+name+'</a></p>');
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

            ALBUM.add(newAlbum, function(){
                redirectBack();
            });
        }
    });
    countryPopUpHide();
}

function redirectBack(){
    var address = '';
    console.log(getURLParameter('countryCode'));
    console.log(getURLParameter('city'));
    if("null"==getURLParameter('countryCode')){
        address = 'city='+getURLParameter('city');
    }else{
        address = 'countryCode='+getURLParameter('countryCode');
    }
    window.location.href = '/albums?'+address;
}