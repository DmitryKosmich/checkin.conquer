'use strict';

var ALERT_TYPE = {

    success: "alert-success",
    info: "alert-info",
    warning: "alert-warning",
    danger: "alert-danger"

};

var ALERT = (function(){

    var getIcon = function(type){
        if(type == ALERT_TYPE.success)  {
            return '<h1 class="glyphicon glyphicon-ok alert_icon"></h1><br>'
        }
        if(type == ALERT_TYPE.info)  {
            return '<h1 class="glyphicon glyphicon-bullhorn alert_icon"></h1><br>'
        }
        if(type == ALERT_TYPE.warning)  {
            return '<h1 class="glyphicon glyphicon-warning-sign alert_icon"></h1><br>'
        }
        if(type == ALERT_TYPE.danger)  {
            return '<h1 class="glyphicon glyphicon-fire alert_icon"></h1><br>'
        }

    };
    var updateListeners = function(){
        $( ".alert" ).click(function() {
            removeAlert(this);
        });
    };

    var removeAlert = function(tag){
        $( tag ).fadeOut("100", function(){
            $( tag ).remove();
        });
    };

    var generateId = function(){
        var date = new Date();
        return 'alert_'+date.getTime()+date.getMilliseconds();
    };

    var hideAlert = function(id){
        setTimeout(function(){
            removeAlert("#"+id);
        }, 5000);
    };

    return {

        show: function(message, type){
            var id = generateId();
            $('#alerts').append('' +
                '<li class="alert '+type+'" role="alert" id="'+id+'">' +
                 getIcon(type)+
                 message+
                '</li>');
            updateListeners();
            hideAlert(id);
            }
    }
})();
