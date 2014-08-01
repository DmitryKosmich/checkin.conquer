
window.onload = function() {
    setLocalization();
    setNavItem('friends');
    DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(users){
        if(users[0]){
            showFriends(users[0].friends);
        }
    });
};

function showFriends(friends){
    for(var i = 0; i < friends.length; i++){
        DB.user.search({FQUserId: friends[i]}, function(users){
            if(users[0]){
                showFriend(users[0]);
            }
        });
    }
}

function showFriend(friend) {
    $( ".friends" ).append(
            '<tr class="row">' +
            '<td><img id="mini_photo" src="'+friend.avatarSrc+'"></td>' +
            '<td>'+friend.name+'</td>' +
            '<td>'+friend.surname+'</td>' +
            '<td>'+friend.homeCity+'</td>' +
            '<td class="text-center"><a href="/friend?id='+friend.FQUserId+'" class="glyphicon glyphicon-tasks"></a></td>' +
            '</tr>'
    );
}
