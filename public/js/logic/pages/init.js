(function(){
    'use strict';

    $(document).ready(function () {
        INITIALIZER.wrapper(function(){
            authPopUpHide();
            countryPopUpHide();
            setNavItem('home_map');
            MAP.init({isRegionClick: true});
            MAP.setColor(CONFIG.BG_COLOR);
            MAP.update();
        });
    });

})();