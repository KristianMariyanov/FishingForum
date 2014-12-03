define(function () {
    var result = $.ajaxSetup({
        headers: {
            "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
            "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb",
//            "X-Parse-Session-Token": getCookie("sessionToken")
            // TODO: unquote the real code
            //hardcoded for test purposes
            "X-Parse-Session-Token": "5nDqDCwPfMpZEUAs7wQKJJvTm"
        }
    });

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    }

    return result;
})




