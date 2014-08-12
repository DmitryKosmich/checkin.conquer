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
                    '<a href="#" onclick="countryPopUpShow()"><img  class="albumImage newAlbum" src="/images/add_album.png"></a>'+
                    '</div>' +
                    '</div>'
            );
        }
    }
}

function next(){

    var userPicasaId = $('#userPicasaId').val();

    var getPreviewURLs = function(index, albums, resultAlbums, callback){
        PICASA.getAlbumPreviewUrl(userPicasaId, albums[index].id, function(err, url){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(url){
                    albums[index].previewSrc = url;
                    resultAlbums.push(albums[index]);
                }
                if(index >= albums.length-1){
                    callback(resultAlbums);
                }else{
                    getPreviewURLs(++index, albums, resultAlbums, callback);
                }
            }
        });
    };

    var showPicasaAlbums = function(albums){
        var currTag = $('.reveal-modal_country_popup.text-center > .modal_content');
        currTag.html('');
        for(var i = 0; i< albums.length; i++){
            currTag.append(
                    '<div class="albumWrapper" style="margin-left: 50px;">' +
                    '<div class="album">'+
                    '<a href="#" onclick="addAlbum(\''+userPicasaId+'\', \''+albums[i].id+'\', \''+albums[i].name+'\')"><img  class="albumImage" src="'+albums[i].previewSrc+'"></a>'+
                    '</div>' +
                    '<div class="albumTitle">'+albums[i].name+'</div>'+
                    '</div>'
            );
        }
    };

    if(userPicasaId){
        PICASA.getAlbums(userPicasaId, function(err, albums){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(albums){
                    var startIndex = 0;
                    getPreviewURLs(startIndex, albums, [], function(resAlbums){
                        showPicasaAlbums(resAlbums);
                    });
                }
            }
        });
    }else{
        ALERT.show("Field picasa id should not be empty!", ALERT_TYPE.WARNING);
    }
}

function addAlbum(userPicasaId, albumPicasaId, name){
    var newAlbum = {
        name: name,
        userPicasaId: userPicasaId,
        albumPicasaId: albumPicasaId
    };

    if (getURLParameter('countryCode')!="null") {
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
    closePopup();
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

function closePopup(){
    setStartPopup();
    countryPopUpHide()
}

function setStartPopup(){
    var currTag = $('.reveal-modal_country_popup.text-center > .modal_content');
    currTag.html('');
    currTag.append(
        '<h1 class="mainColor" data-localize="new_album">New album</h1>'+
        '<div class="form-group">'+
        '<label for="userPicasaId" data-localize="picasa_user_id">Picasa User Id</label>'+
        '<input type="text" class="form-control" id="userPicasaId" placeholder="Picasa User Id">'+
        '</div>'+
        '<a href="#" class="btn btn-default" onclick="next()" data-localize="Next">Next</a>'
    );
}