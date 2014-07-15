
window.onload = function() {
    setNavItem('friends');
    foursquare.getFriends('self', function(data){
        console.log(data);
        showFriends(data);
    });
};

function showFriends(data){
    var id = '';
    var name = '';
    var surname = '';
    var homeCity = '';
    if(data.response.friends.count > 0){
        for(var i = data.response.friends.count-1; i>= 0; i--){
            if(data.response.friends.items[i].relationship=='friend'){
                for(var j = data.response.friends.items.length-1; j>= 0; j--){
                    id = data.response.friends.items[j].id;
                    name = data.response.friends.items[j].firstName;
                    surname = data.response.friends.items[j].lastName;
                    homeCity = data.response.friends.items[j].homeCity;

                    showFriend(id, name, surname, homeCity);
                }
            }
        }
    }
}

function showFriend(id, name, surname, homeCity) {
    $( ".friends" ).append(
        '<tr class="row">' +
        '<td></td>' +
        '<td>'+name+'</td>' +
        '<td>'+surname+'</td>' +
        '<td>'+homeCity+'</td>' +
        '<td><a href="/friend?id='+id+'">Compare with me</a></td>' +
        '</tr>' );
}
