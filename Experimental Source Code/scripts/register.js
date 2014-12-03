$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
            "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb"
        }
    });

    var buttonRegister = $('#registerBtn');
    buttonRegister.click(registerUser);

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
    };

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
})
