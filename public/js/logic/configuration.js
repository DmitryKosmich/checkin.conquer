
var config = {
    ACCESS_TOKEN: String(sessionStorage.ACCESS_TOKEN),
    CLIENT_ID: 'CN23WK1RKT1VL0VPZM2OTEGVKYMH0PYXJPOW02HOOJ2YYAXV',
    REDIRECT_URL: document.URL,
    VISITED_COUNTRY_COLOR : '#29c5e6',
    BG_COLOR : '#444'
};

function setSessionToken(token){
    if(typeof(Storage) !== "undefined") {
        sessionStorage.ACCESS_TOKEN = token;
    }else{
        alert('Sorry! No Web Storage support..');
    }
}