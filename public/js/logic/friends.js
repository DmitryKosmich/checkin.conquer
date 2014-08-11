
window.onload = function() {
    setLocalization();
    setNavItem('friends');
    DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(err, users){
        if(err) {
            ALERT.show(err, ALERT_TYPE.DANGER);
        }else{
            if(users[0]){
                showFriends(users[0].friends);
            }
        }
    });
};

function showFriends(friends){
    for(var i = 0; i < friends.length; i++){
        (function(n, m){
            DB.user.search({FQUserId: friends[n]}, function(err, users){
                if(err) {
                    ALERT.show(err, ALERT_TYPE.DANGER);
                }else{
                    if(users[0]){
                        showFriend(users[0]);
                    }else{
                        console.error('no user');
                    }
                    if(n == m){
                        $("#loadingImage").fadeOut("slow");
                    }
                }
            });
        })(i, friends.length-1);
    }
}

function showFriend(friend) {
    var compare = '';
    if(friend.lastUpdate == '0'){
        compare = '<a href="#" onclick="sendInvite('+friend.FQUserId+')">invite</a>';
    }else{
        compare = '<a href="/battle?id='+friend.FQUserId+'" class="glyphicon glyphicon-tasks"></a>';
    }
    $( ".friends" ).append(
            '<tr class="row">' +
            '<td><a href="/user?id='+friend.FQUserId+'"><img id="mini_photo" src="'+friend.avatarSrc+'"></a></td>' +
            '<td>'+friend.name+'</td>' +
            '<td>'+friend.surname+'</td>' +
            '<td>'+friend.points+'</td>' +
            '<td>'+friend.homeCity+'</td>' +
            '<td class="text-center">'+compare+'</td>' +
            '</tr>'
    );
}

function sendInvite(FQUserId){
    DB.user.search({FQUserId: SESSION.get("currentUserId")},function(err, users){
        if(err) {
            ALERT.show(err, ALERT_TYPE.DANGER);
        }else{
            if(users[0] && users[0].email != 'unknown'){
                var user = users[0];
                DB.user.search({FQUserId: FQUserId}, function(err, frineds){
                    if(err) {
                        ALERT.show(err, ALERT_TYPE.DANGER);
                    }else{
                        if(frineds[0]){
                            var message = {
                                from: user.email,
                                to: frineds[0].email,
                                subject: "Invite",
                                body: "Dear, "+frineds[0].name+", your friend "+user.name+" "+user.surname+" invited " +
                                    "you to join to "+config.CURR_WEB_ADDRESS+".  With respect Checkiner."
                            };
                            $("#loadingImage").show();
                            ALERT.show("Sending was started!", ALERT_TYPE.INFO);
                            EMAIL.send(message, function(err, data){
                                if(err){
                                    ALERT.show("Letter was not sent!", ALERT_TYPE.DANGER);
                                    $("#loadingImage").fadeOut("slow");
                                }else{
                                    ALERT.show("Letter was sent!", ALERT_TYPE.SUCCESS);
                                    $("#loadingImage").fadeOut("slow");
                                }
                            });
                        }
                    }
                });

            }
        }
    });
}