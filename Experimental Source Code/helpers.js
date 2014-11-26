$.ajaxSetup({
    headers: {
        "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
        "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb",
        "X-Parse-Session-Token": getCookie("sessionToken")
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

function createTag(name){
    $.ajax({
        method: "POST",
        url: 'https://api.parse.com/1/classes/tag',
        contentType: "application/json",
        data: JSON.stringify({
            "title":name,
            "counter":0
        }),
        error: errorReport
    });
}

function logIn(username, pass){
    $.ajax({
        method: "GET",
        url: 'https://api.parse.com/1/login?username=' + username + '&password=' + pass,
        contentType: "application/json",
        data: null,
        success: function(data){
            console.log(JSON.stringify(data));
            //localStorage.setItem("sessionToken", data.sessionToken);
            document.cookie = "sessionToken=" + data.sessionToken;
        },
        error: function(err){
            console.log(err);
        }
    });
}

function registerUser(){
    var username= $("#username").val();
    var password= $("#password").val();
    var email= $("#email").val();
    var firstName = $("#firstName").val();
    var lastName= $("#lastName").val();
    var aboutMe= $("#aboutMe").val();

    var createdUserId = "";

    $.ajax({
        method: "POST",
        url: 'https://api.parse.com/1/users',
        contentType: "application/json",
        data: JSON.stringify({
            "username":username,
            "password":password,
            "firstName": firstName,
            "lastName":lastName,
            "rating":0,
            "email":email,
            "aboutMe":aboutMe
        }),
        success: function(data){
            setRole(data);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function setRole(data){
    $.support.cors = true;
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            "users":
            {
                "__op":"AddRelation",
                "objects":[
                    {   "__type":"Pointer",
                        "className":"_User",
                        "objectId":data.objectId
                    }]
            }}),
        url: 'https://api.parse.com/1/classes/_Role/fMLotQQa9j',
        success: function(data){
            console.log('Successfully assigned a role!');
        },
        error: function(err){
            console.log("Fail!!!! --");
            console.log(err);
        }
    });
}

function errorReport(err){
    throw new Error(err);
}