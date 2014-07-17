
window.onload = function() {

    $(document).ready(function () {
        setLocalization();
        foursquare.getUser(getURLParameter('id'), function(data){
            $('#vs_title').append(data.response.user.firstName+' '+data.response.user.lastName  );
            fullUserForm('f', data);
        });
        foursquare.getUser('self', function(data){
            fullUserForm('self', data);
        });
    });
};

function fullUserForm(flag, data){
    $( '#'+flag+"_friends" ).val(data.response.user.friends.count);
    $( '#'+flag+"_checkins" ).val(data.response.user.checkins.count);
    $( '#'+flag+"_tips" ).val(data.response.user.tips.count);
    $( '#'+flag+"_badges" ).val(data.response.user.badges.count);
    $( '#'+flag+"_mayorships" ).val(data.response.user.mayorships.count);
}