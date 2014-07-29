'use strict';

var PICASA = (function(){
    return {
        getAlbumPreviewUrl: function(userId, albumId, album ,callback){
            $.get( "https://picasaweb.google.com/data/feed/api/user/"+userId+"/albumid/"+albumId+"?fields=entry%2Fmedia%3Agroup%2Fmedia%3Acontent%5B%40url%5D&alt=json",
            function( data ) {
                album.url = data.feed.entry[0].media$group.media$content[0].url;
                callback(album);
            }, "json" );
        }
    }
})();