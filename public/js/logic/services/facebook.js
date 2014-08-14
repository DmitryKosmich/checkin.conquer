
var FACEBOOK = (function(){

    return {
        init: function(){
            window.fbAsyncInit = function() {
                console.log("FB.init");
                FB.init({
                    appId      : '608985209216820',
                    xfbml      : true,
                    version    : 'v2.0'
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },

        publish: function() {
            $('.fb-share-button').attr('data-href', "https://"+CONFIG.CURR_WEB_ADDRESS);
        }
    }
})();

(function(){
    FACEBOOK.init();
    FACEBOOK.publish();
})();
