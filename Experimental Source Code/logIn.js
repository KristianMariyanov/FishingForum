$(document).ready(function () {
    // Headers and Checking the User
    $.ajaxSetup({
        headers: {
            "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
            "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb"
        }
    });

    //Actual Login
    $("#logInBtn").on("click", function() {
        logIn($("#username").val(), $("#password").val());
    });

    function logIn(username, pass){
        $.ajax({
            method: "GET",
            url: 'https://api.parse.com/1/login?username=' + username + '&password=' + pass,
            contentType: "application/json",
            data: null,
            success: function(data){
                //for test purposes
                console.log(JSON.stringify(data));
                document.cookie = "sessionToken=" + data.sessionToken;
                localStorage.setItem("loggedUserId", data.objectId);
            },
            error: function(err){
                console.log(err);
            }
        });
    }
})
