
window.onload = function() {
    setNavItem('friends');
    foursquare.getFriends('self', function(data){
        showFriends(data);
    });
};

function showFriends(data){
    var id = '';
    var name = '';
    var surname = '';
    var homeCity = '';
    if(data.response.friends.count > 0){
        for(var j = data.response.friends.count-1; j>= 0; j--){
            if(data.response.friends.items[j].relationship=='friend'){
                id = data.response.friends.items[j].id;
                name = data.response.friends.items[j].firstName;
                surname = data.response.friends.items[j].lastName;
                homeCity = data.response.friends.items[j].homeCity;

                showFriend(id, name, surname, homeCity);
            }
        }
    }
}

function showFriend(id, name, surname, homeCity) {
    foursquare.getUser(id, function(data){
        $( ".friends" ).append(
                '<tr class="row">' +
                '<td><img id="mini_photo" src="'+data.response.user.photo.prefix+'110x110'+data.response.user.photo.suffix+'"></td>' +
                '<td>'+name+'</td>' +
                '<td>'+surname+'</td>' +
                '<td>'+homeCity+'</td>' +
                '<td><a href="/friend?id='+id+'">Compare with me</a></td>' +
                '</tr>' );
    });
}
