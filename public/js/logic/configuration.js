
var config = {
    ACCESS_TOKEN: String(sessionStorage.ACCESS_TOKEN),
    CLIENT_ID: 'CN23WK1RKT1VL0VPZM2OTEGVKYMH0PYXJPOW02HOOJ2YYAXV',
    REDIRECT_URL: document.URL,
    VISITED_COUNTRY_COLOR : '#29a3c4',
    VISITED_COUNTRY_COLOR_BD : '#29c5e6',
    BG_COLOR : '#666'
};

function setSessionToken(token){
    if(typeof(Storage) !== "undefined") {
        sessionStorage.ACCESS_TOKEN = token;
    }else{
        alert('Sorry! No Web Storage support..');
    }
}