
window.onload = function() {

    $(document).ready(function () {
        setLocalization();
        DB.user.search({FQUserId: getURLParameter('id')}, function(users){
            $('#vs_title').append(users[0].name+' '+users[0].surname  );
            fullUserForm('f', users[0]);
        });
        DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(users){
            fullUserForm('self', users[0]);
        });
    });
};

function fullUserForm(flag, user){
    $( '#'+flag+"_friends" ).val(user.frindsNmbr);
    $( '#'+flag+"_checkins" ).val(user.checkinsNmbr);
    $( '#'+flag+"_tips" ).val(user.tipsNmbr);
    $( '#'+flag+"_badges" ).val(user.badgesNmbr);
    $( '#'+flag+"_mayorships" ).val(user.mayorshipsNmbr);
}