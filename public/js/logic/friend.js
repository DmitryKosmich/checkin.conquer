
window.onload = function() {

    $(document).ready(function () {
        setLocalization();
        map.init({isRegionClick: false});
        map.setColor(config.BG_COLOR);
        DB.user.search({FQUserId: getURLParameter('id')}, function(users){
            if(users[0]){
                $('#vs_title').append(users[0].name+' '+users[0].surname  );
                fullUserForm('f', users[0]);
            }else{
                console.error('ERROR: user '+ getURLParameter('id')+' not founded!');
            }
        });
        DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(users){
            fullUserForm('self', users[0]);
        });
        map.updateCompetition(getURLParameter('id'), config.FRIEND_COLOR, SESSION.get("currentUserId"), config.VISITED_COUNTRY_COLOR);
        $("#loadingImage").fadeOut("slow");
    });
};

function fullUserForm(flag, user){
    $( '#'+flag+"_friends" ).val(user.frindsNmbr);
    $( '#'+flag+"_checkins" ).val(user.checkinsNmbr);
    $( '#'+flag+"_tips" ).val(user.tipsNmbr);
    $( '#'+flag+"_badges" ).val(user.badgesNmbr);
    $( '#'+flag+"_mayorships" ).val(user.mayorshipsNmbr);
}