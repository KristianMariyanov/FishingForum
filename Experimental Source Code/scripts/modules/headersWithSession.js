define(function () {
    var result = $.ajaxSetup({
        headers: {
            "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
            "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb",
//            "X-Parse-Session-Token": getCookie("sessionToken")
            //hardcoded session token for test purposes
            "X-Parse-Session-Token": "5nDqDCwPfMpZEUAs7wQKJJvTm"
        }
    });
    return result;
})




