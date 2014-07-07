function initFB(){
    FB.init({
        appId: 608985209216820,
        frictionlessRequests: true,
        status: true,
        version: 'v2.0'
    });

    FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
    FB.Event.subscribe('auth.statusChange', onStatusChange);
}

function login(callback) {
    FB.login(callback);
}
function loginCallback(response) {
    console.log('loginCallback',response);
    if(response.status != 'connected') {
        top.location.href = 'https://www.facebook.com/appcenter/YOUR_APP_NAMESPACE';
    }
}
function onStatusChange(response) {
    if( response.status != 'connected' ) {
        login(loginCallback);
    } else {
        showHome();
    }
}
function onAuthResponseChange(response) {
    console.log('onAuthResponseChange', response);
}