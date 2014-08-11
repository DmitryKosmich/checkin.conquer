'use strict';

(function(){

    $(document).ready(function () {
        setLocalization();
        getUser(function(user){
            fillUser(user);
            $("#loadingImage").fadeOut("slow");
        });
    });

    function getUser(callback){
        var id = '';
        if(getURLParameter('id') == "me"){
            id = SESSION.get("currentUserId");
        }else{
            id = getURLParameter('id');
        }
        SYNCHRONIZER.update.points(id, function(){
            DB.user.search({FQUserId: id}, function(err, users){
                if(err){
                    ALERT.show(err, ALERT_TYPE.DANGER);
                }else{
                    if(users){
                        callback(users[0]);
                    }
                }
            });
        });
    }

    function fillUser(user){
        $("#user_avatar").attr('src', user.avatarSrc);
        $('#user_points').val(user.points);
        $('.user_name').append(user.name+" "+user.surname);
        setLastVisit(user);
        $("#email").val(user.email);
        $("#home").val(user.homeCity);
    }

    function setLastVisit(user){
        if(((new Date().getTime() / 1000) - user.lastUpdate) < config.UPDATE_INTERVAL){
            $('#last_visit').append("Online");
        }else{
            if(user.lastUpdate!="0"){
                var date = new Date(user.lastUpdate*1000);
                $('#last_visit').append('Последнее посещение: '+ date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" в "+date.getHours()+":"+date.getMinutes());
            }
        }
    }
})();