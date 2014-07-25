var ALBUM = (function(){
    return {
        get: function(album, callback){
            $.post( "/album/get", {'album' : album}, function( data ) {
                callback(data);
            }, "json");
        },

        add: function(album, callback){
            $.post( "/album/add", {'album' : album}, function( data ) {
                callback(data);
            }, "json");
        },

        delete: function(album, callback){
            $.post( "/album/delete", {'album' : album}, function( data ) {
                callback(data);
            }, "json");
        }
    }
})();

$(document).ready(function () {
    FOURSQUARE.getUser('self', function(userData){
        var album = {
            userId: userData.response.user.id,
            countryCode: getURLParameter('countryCode')
        };

        ALBUM.get(album, function(albumData){
            if(!albumData.album){
                $('#deleteButton').hide();
                showAddAlbumText();
            }else{
                init(albumData.album.userPicasaId, albumData.album.albumPicasaId);
            }
        });
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

function showAddAlbumText(){
    $("#gallery").append('<div class="form-group">'+
           ' <label for="userPicasaId">Picasa User Id</label>'+
            '<input type="text" class="form-control" id="userPicasaId" placeholder="Picasa User Id">'+
            '</div>'+
           ' <div class="form-group">'+
                '<label for="albumPicasaId">Picasa Album Id</label>'+
                '<input type="text" class="form-control" id="albumPicasaId" placeholder="Picasa Album Id">'+
               ' </div>'+
               ' <a href="#" class="btn btn-default" onclick="addAlbum()">Add</a>');
}

function addAlbum(){
    FOURSQUARE.getUser('self', function(userData){
        if($("#userPicasaId").val() && $("#userPicasaId").val()){
            var newAlbum = {
                userId: userData.response.user.id,
                userPicasaId: $("#userPicasaId").val(),
                albumPicasaId: $("#albumPicasaId").val(),
                countryCode: getURLParameter('countryCode')
            };

            ALBUM.add(newAlbum, function(){
                window.location.href = '/album?countryCode='+getURLParameter('countryCode');
            });
        }
    });
}

function deleteAlbum(){
    FOURSQUARE.getUser('self', function(userData){
        var album = {
            userId: userData.response.user.id,
            countryCode: getURLParameter('countryCode')
        };

        ALBUM.delete(album, function(){
            window.location.href = '/album?countryCode='+getURLParameter('countryCode');
        });
    });
}